import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Table, Upload } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
// import ModalList from './components/ModalList'
// const { confirm } = Modal

@withI18n()
@connect(({ tacticUser, loading }) => ({ tacticUser, loading }))
class Index extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

    router.replace({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        { arrayFormat: 'repeat' }
      ),
    })
  }

  handleItems = (key) => {
    const { dispatch, tacticUser, i18n } = this.props
    const { selectedRowKeys } = tacticUser

    if (key === '1') {
      dispatch({
        type:'tacticUser/eventTypeList',
      }).then(
        dispatch({
          type: 'tacticUser/showModal',
          payload: {
            modalType: 'create',
          },
        })
      )
    }else if(key === '3'){
      window.location.href = window.ip+'/ruleCustomer/export';
    }
  }

  multiDeleteItems = () => {
    const { dispatch, tacticUser, i18n } = this.props
    const { list, pagination, selectedRowKeys } = tacticUser
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'tacticUser/multiDelete',
            payload: [selectedRowKeys].toString(),
          }).then(() => {
            that.handleRefresh({
              current:
                list.length === 1 && pagination.current > 1
                  ? pagination.current - 1
                  : pagination.current,
            })
          })
        },
      })
    }
  }

  get listProps() {
    const { dispatch, tacticUser, loading } = this.props
    const { list, pagination, selectedRowKeys } = tacticUser
    return {
      dataSource: list,
      loading: loading.effects['tacticUser/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'tacticUser/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type:'tacticUser/eventTypeList',
        })
        dispatch({
          type: 'tacticUser/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onCopyItem: id => {
        dispatch({
          type: 'tacticUser/ruleCustomerCopy',
          payload: {
            id: id
          },
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onChecked(id,status){
        dispatch({
          type: 'tacticUser/updateStrategy',
          payload: {
            id:id,
            status:status=="1"?'0':'1',
          },
        })
      },
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'tacticUser/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get modalProps() {
    const { dispatch, tacticUser, loading, i18n } = this.props
    const { currentItem, log, modalVisible, modalType, listAsset } = tacticUser

    return {
      modalType:modalType,
      item: modalType === 'sysLog' ? log : modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`tacticUser/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`新增规则` : 
        modalType === 'update' ? i18n.t`编辑规则` : 
        modalType === 'details' ? i18n.t`规则详情` : 
        modalType === 'email' ? i18n.t`邮件配置` : 
        modalType === 'sysLog' ? i18n.t`SYSLOG配置` : i18n.t`规则详情`
      }`,
      listAsset:listAsset,
      onOk: data => {
        if(modalType === 'update' || modalType === 'create'){
          if(data.warnningType!=null){
            data.warnningType = data.warnningType.join(',')
          }
          dispatch({
            type: `tacticUser/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType === 'email'){
          dispatch({
            type: 'tacticUser/setEmailConfig',
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType === 'sysLog'){
          dispatch({
            type:'tacticUser/updateSyslog',
            payload:data
          }).then(()=>{
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'tacticUser/hideModal',
        })
      },
      onMailSetting() {
        dispatch({
          type: 'tacticUser/hideModal',
        })
        setTimeout(() => {
          dispatch({
            type: 'tacticUser/getEmailConfig',
          }).then(
            dispatch({
              type: 'tacticUser/showModal',
              payload: {
                modalType: 'email',
              },
            })
          )
        }, 50)
      },
      onSysLog() {
        dispatch({
          type: 'tacticUser/hideModal',
        })
        setTimeout(() => {
          dispatch({
            type: 'tacticUser/getSyslog',
          }).then(
            dispatch({
              type: 'tacticUser/showModal',
              payload: {
                modalType: 'sysLog',
              },
            })
          )
        }, 50)
      },
    }
  }

  render() {
    const uploadProps = {
      name: 'file',
      action: window.ip+'/ruleCustomer/excelInsert',
      headers: {
        authorization: 'authorization-text',
      },
      // data:{
      //   type:'1'
      // },
      showUploadList:false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done' && info.file.response.code == 0) {
          message.success(`${info.file.name} 导入成功`).then(() => {
            location.reload();
          });
        } else if(info.file.status === 'done' && info.file.response.code != 0) {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        }
      },
    }
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button> */}
          <Button className="margin-right" type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button>
          <Upload style={{display:'inline-block'}} {...uploadProps}>
            <Button type="primary" size="small" className="margin-right"><Icon type="vertical-align-bottom" />导入</Button>
          </Upload>
        </div>
        <List {...this.listProps} />
        {/* <ModalList {...this.modalListProps} /> */}
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  tacticUser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
