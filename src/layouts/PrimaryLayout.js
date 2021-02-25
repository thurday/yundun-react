/* global window */
/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout, Drawer, Form, Input, Button, Modal } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, pathMatchRegexp, langFromPath } from 'utils'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'
import store from 'store'

const { Content } = Layout
const { Header, Bread, Sider } = MyLayout
const FormItem = Form.Item
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,

  }

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }

  componentWillMount() {
    // Preload linear pic
    
    if(!store.get('user')){
      const {history,location} = this.props;
      history.replace("/login");

    }
    
    if (document.getElementById('linear_pic')) return
    const image = document.createElement('img')
    image.id = 'linear_pic'
    image.style.display = 'none'
    image.src = 'linear_pic.svg'
    document.body.appendChild(image);
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, location, dispatch, children } = this.props
    const { theme, collapsed, notifications, messageCount, messageList } = app
    const user = store.get('user') || {}
    const permissions = store.get('permissions') || {}
    const routeList = store.get('routeList') || []
    const { isMobile } = this.state
    const { onCollapseChange } = this

    // Localized route name.
    const lang = langFromPath(location.pathname)
    const newRouteList =
      lang !== 'en'
        ? routeList.map(item => {
          
            const { name, ...other } = item
            return {
              ...other,
              name: (item[lang] || {}).name || name,
            }
          })
        : routeList
          
    // Find a route that matches the pathname.
    const currentRoute = newRouteList.find(
      _ => _.url && pathMatchRegexp(_.url, location.pathname)
    )
    // const currentRoute = newRouteList.find(
    //   _ => _.name
    // )

    // Query whether you have permission to enter this page
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.menuId)
      : false

    // const hasPermission = currentRoute
    //   ? true
    //   : false
      
    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.parentId != '0')
    const headerProps = {
      menus,
      collapsed,
      notifications,
      messageList,
      messageCount,
      onCollapseChange,
      avatar: user.avatar,
      username: user.username,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
      onLockingOut() {
        dispatch({ type: 'app/locking' })
      },
      onUpdateUser() {
        dispatch({ type: 'app/UserCenter' })
      },
      onChangePwd() {
        dispatch({ type: 'app/ChangePwd' })
      },
      onRead(ids) {
        dispatch({ type: 'app/read',payload:ids })
      }
    }

    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              placement="left"
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 50 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              {/*<Bread routeList={newRouteList} />*/}
              {/* {hasPermission ? children : <Error />} */}
              {hasPermission ? children : children}
            </Content>
            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
            {/*<GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />*/}
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default PrimaryLayout
