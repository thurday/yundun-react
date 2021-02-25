import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Spin, Form, DatePicker } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button, AsyncSelect } from 'components'
import { stringify } from 'qs'
import styles from './index.less'
const { RangePicker } = DatePicker;
const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 22,
        offset: 1,
    },
}

@withI18n()
@connect(({ systemReplay, loading }) => ({ systemReplay, loading }))
class Index extends PureComponent {
  state = {
    iface: '',
    startDate:'',
    endDate:''
  }
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

  cardChange = (value) => {
    this.setState({iface:value})
  }

  timeChange = (value, dateString) => {
    this.setState({
      startDate: dateString[0],
      endDate: dateString[1],
    })
  }

  submit = () => {
    const { systemReplay, dispatch,loading } = this.props
    if(this.state.iface && this.state.startDate && this.state.endDate){
      dispatch({
        type: 'systemReplay/rePlayFn',
        payload: {
          iface: this.state.iface,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
        }
      })
    }else{
      message.warn('时间或网卡不能为空')
    }

  };

  render() {
    const { i18n, systemReplay } = this.props
    const { listAsset } = systemReplay
    const option = listAsset.map(item => ({value:item.name,label:item.name}))
    console.log(this.props);
    return (
      <Page inner>
          <div style={{width:'52%',background:'#fff',margin:'0 auto',padding:'20px 16px',minHeight:520}}>
            <Spin spinning={false}>
                <Form layout="horizontal" className={styles.form}>
                  <FormItem name="还原回放" label="还原回放" {...formItemLayout}>
                      <span style={{display:'inline-block',width:60}}>时间</span><RangePicker onChange={this.timeChange} />
                  </FormItem>
                  <FormItem name="选择网卡" label="" {...formItemLayout}>
                      <span style={{display:'inline-block',width:60}}>选择网卡</span><AsyncSelect onChange={this.cardChange} defaultOptions={option} placeholder={i18n.t`请选择身份`} width="40%" />
                  </FormItem>
                  <FormItem
                      wrapperCol={{
                      xs: { span: 24, offset: 0 },
                      sm: { span: 16, offset: 3 },
                      }}
                  >
                      <Button type="primary" htmlType="submit" onClick={this.submit}>
                      回放
                      </Button>
                  </FormItem>
                </Form>
            </Spin>
          </div>
      </Page>
    )
  }
}

Index.propTypes = {
    systemReplay: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default Index
