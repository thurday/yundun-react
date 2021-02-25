import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Layout, Avatar, Popover, Badge, List, Tooltip, Modal, Table, Button, message } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import { Trans, withI18n } from '@lingui/react'
import { setLocale } from 'utils'
import moment from 'moment'
import classnames from 'classnames'
import config from 'config'
import styles from './Header.less'
import { Link } from 'react-router-dom'
const { SubMenu } = Menu

@withI18n()
class Header extends PureComponent {
  constructor(props) {
    super(props)
    let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    this.state = {
      isFullscreen,
      showFullScreenBtn: this.showFullScreenBtn(),
      visible:false,
      tableList:[],
      ids:''
    }
  }

  componentDidMount() {
    this.handleChange('on')
    // this.fetchList()
  }

  componentWillUnmount() {
    this.handleChange('off')
    this.listener = null
  }

  showFullScreenBtn = () => {
    return window.navigator.userAgent.indexOf('MSIE') < 0
  }

  handleFullscreen = () => {
    let main = document.body
    if (this.state.isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    } else {
      if (main.requestFullscreen) {
        main.requestFullscreen()
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen()
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen()
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen()
      }
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  fetchList = () => {
    fetch(window.ip+'/message/list',{
      method:'post',
      // body:JSON.stringify({
      //   　　'license' : instance.inputValue
      // }),
      headers:{authorization:localStorage.getItem('token')}
    }).then(res => res.json()).then(res => {
      if(res.code == 0){
        let ids = [];
        for(var i=0;i<res.data.length;i++){
          ids.push(res.data[i].id);
        }
        this.setState({
          tableList:res.data,
          ids:ids.toString()
        })
      }
    })
  }

  handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  listener = () => {
    this.setState({ isFullscreen: !this.state.isFullscreen })
  }

  handleChange = (type = 'on') => {
    const method = type === 'on' ? 'addEventListener' : 'removeEventListener'
    document[method]('fullscreenchange', this.listener.bind(this))
    document[method]('mozfullscreenchange', this.listener.bind(this))
    document[method]('webkitfullscreenchange', this.listener.bind(this))
    document[method]('msfullscreenchange', this.listener.bind(this))
  }

  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
    e.key === 'SignLocking' && this.props.onLockingOut()
    e.key === 'UserCenter' && this.props.onUpdateUser()
    e.key === 'ChangePwd' && this.props.onChangePwd()
  }

  onReload = () => {
    window.location.reload()
  }

  onItemClick = (key) => {
    switch (key) {
      case '3':
        this.handleFullscreen()
        break
      case '4':
        this.showModal()
        break
      default:
        break
    }
  }

  onRead = () => {
    const { dispatch, onRead, messageList } = this.props
    let ids = messageList.map(item => item.id)
    onRead([ids].toString())
  }

  render() {
    const {
      i18n,
      fixed,
      avatar,
      username,
      collapsed,
      notifications,
      onCollapseChange,
      onAllNotificationsRead,
      messageList,
      messageCount,
      onRead
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              {/*<span style={{ marginRight: 4 }}>
                <Trans>Hi,</Trans>
              </span>*/}
              <span style={{ marginRight: 2 }}>{username || 'Admin'}</span>
              <Icon type="down" />
              {/*<Avatar style={{ marginLeft: 8 }} src={avatar} />*/}
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            <Trans>Sign out</Trans>
          </Menu.Item>
          <Menu.Item key="SignLocking">
            <Trans>Locking</Trans>
          </Menu.Item>
          <Menu.Item key="UserCenter" >
            <Trans>Personal Center</Trans>
          </Menu.Item>
          <Menu.Item key="ChangePwd" >
            <Trans>Change Password</Trans>
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    const defaultProps = {
      destroyOnClose: true,
      maskClosable: false,
      closable: false,
      centered: true,
      width: '800px',
    }

    const columns = [
      {
        title: '事件名称',
        dataIndex: 'message',
        key: 'message',
      render: (text,record) => <div>
        {record.isRead=='0'?<Badge style={{display:'inline-block',width:20}} status="error" />:''}
        <Link to={record.type==2?'/event?level='+record.type:record.type==3?'/event?level='+record.type:record.type==0?'/loophole/check':''}>{text}</Link>
      </div>,
      },
      {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
      },
    ];

    // if (config.i18n) {
    //   const { languages } = config.i18n
    //   const currentLanguage = languages.find(
    //     item => item.key === i18n._language
    //   )

    //   rightContent.unshift(
    //     <Menu
    //       key="language"
    //       selectedKeys={[currentLanguage.key]}
    //       onClick={data => {
    //         setLocale(data.key)
    //       }}
    //       mode="horizontal"
    //     >
    //       <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
    //         {languages.map(item => (
    //           <Menu.Item key={item.key}>
    //             <Avatar
    //               size="small"
    //               style={{ marginRight: 8 }}
    //               src={item.flag}
    //             />
    //             {item.title}
    //           </Menu.Item>
    //         ))}
    //       </SubMenu>
    //     </Menu>
    //   )
    // }

    rightContent.unshift(
      <Tooltip key={'fullscreen'} title={!this.state.isFullscreen ? '全屏' : '退出'}>
        <span className={styles.iconButton} onClick={_ => this.onItemClick('3')}>
          <img src={'./icons/fullscreen.svg'} />
        </span>
      </Tooltip>
    )

    rightContent.unshift(
      <Tooltip key={'notice'} title={'通知'}>
        <span className={styles.iconButton} onClick={_ => this.onItemClick('4')}>
          <Badge size="small" count={messageCount}>
            <span>
              <img className={styles.badgeImg} src={'/icons/notice.svg'} />
            </span>
          </Badge>
        </span>
      </Tooltip>
    )

    // rightContent.unshift(
    //   <Tooltip key={'tag'} title={'标签'}>
    //     <span className={styles.iconButton} onClick={_ => this.onItemClick('2')}>
    //       <img src={'/icons/tag.svg'} />
    //     </span>
    //   </Tooltip>
    // )

    // rightContent.unshift(
    //   <Tooltip key={'palette'} title={'色板'}>
    //     <span className={styles.iconButton} onClick={_ => this.onItemClick('1')}>
    //       <img src={'/icons/palette.svg'} />
    //     </span>
    //   </Tooltip>
    // )

    rightContent.unshift(
      <Popover
        placement="bottomRight"
        trigger="click"
        key="notifications"
        overlayClassName={styles.notificationPopover}
        getPopupContainer={() => document.querySelector('#layoutHeader')}
        content={
          <div className={styles.notification}>
            <List
              itemLayout="horizontal"
              dataSource={notifications}
              locale={{
                emptyText: <Trans>You have viewed all notifications.</Trans>,
              }}
              renderItem={item => (
                <List.Item className={styles.notificationItem}>
                  <List.Item.Meta
                    title={
                      <Ellipsis tooltip={false} lines={1}>
                        {item.title}
                      </Ellipsis>
                    }
                    description={moment(item.date).fromNow()}
                  />
                  <Icon
                    style={{ fontSize: 10, color: '#ccc' }}
                    type="right"
                    theme="outlined"
                  />
                </List.Item>
              )}
            />
            {notifications.length ? (
              <div
                onClick={onAllNotificationsRead}
                className={styles.clearButton}
              >
                <Trans>Clear notifications</Trans>
              </div>
            ) : null}
          </div>
        }
      >
        {/* <Tooltip title={'通知'}>
          <Badge
            count={notifications.length}
            dot
            offset={[-10, 10]}
            className={styles.iconButton}
          >
            <img src={'/icons/bell.svg'} />
          </Badge>
        </Tooltip> */}
      </Popover>
    )

    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.fixed]: fixed,
          [styles.collapsed]: collapsed,
        })}
        id="layoutHeader"
      >
        <div className={styles.leftContainer}>
          <div
            className={styles.button}
            onClick={onCollapseChange.bind(this, !collapsed)}
            title={'菜单'}
          >
            <Icon
              type={classnames({
                'menu-unfold': collapsed,
                'menu-fold': !collapsed,
              })}
            />
          </div>
          <Tooltip title={'刷新'}>
            <div
              className={styles.button}
              onClick={this.onReload}
            >
              <Icon type="reload" />
            </div>
          </Tooltip>
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
        <Modal
          title="您有通知"
          visible={this.state.visible}
          footer={[
            <Button type="primary" onClick={this.handleOk}>
              关闭
            </Button>,
          ]}
          {...defaultProps}
        >
          <Button onClick={this.onRead} style={{float:'right',marginBottom:10}} type="primary">标记为已读</Button>
          <Table style={{clear:'both'}} columns={columns} dataSource={messageList} pagination={false} />
        </Modal>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onCollapseChange: PropTypes.func,
  onAllNotificationsRead: PropTypes.func,
  messageCount: PropTypes.object,
  messageList: PropTypes.object,
  onRead: PropTypes.func,
}

export default Header
