import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Avatar } from 'antd'
import Navlink from 'umi/navlink'
import withRouter from 'umi/withRouter'
import {
  arrayToTree,
  queryAncestors,
  pathMatchRegexp,
  addLangPrefix,
} from 'utils'
import store from 'store'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => _.isChild).map(_ => _.menuId)
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys);
  }

  onSelect = ({ key }) => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => _.isChild).map(_ => _.menuId)
    if (rootSubmenuKeys.indexOf(key) !== -1) {
      this.setState({ openKeys: [] })
      store.set('openKeys', [])
    }
  }

  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.menuId}
            title={
              <Fragment>
                {item.icon && <Avatar className="anticon" src={item.icon} style={{ borderRadius: 0 }} />}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.menuId}>
          <Navlink to={addLangPrefix(item.url) || '#'}>
            {item.icon && <Avatar className="anticon" src={item.icon} style={{ borderRadius: 0 }} />}
            <span>{item.name}</span>
          </Navlink>
        </Menu.Item>
      )
    })
  }

  render() {
    const {
      collapsed,
      theme,
      menus,
      location,
      isMobile,
      onCollapseChange,
    } = this.props
    // Generating tree-structured data for menu content.
    const menuTree = arrayToTree(menus, 'menuId', 'parentId')
    // Find a menu that matches the pathname.
    const currentMenu = menus.find(
      _ => _.url && pathMatchRegexp(_.url, location.pathname)
    )
    // Find the key that should be selected according to the current menu.
    const selectedKeys = currentMenu
      // ? queryAncestors(menus, currentMenu, 'parentId').map(_ => _.menuId)
      ? queryAncestors(menus, currentMenu, 'isChild==null').map(_ => _.menuId)
      : []
    // const selectedKeys = currentMenu
    //   ? menus.map(_ => _.menuId)
    //   : []

    const menuProps = collapsed
      ? {}
      : {
          openKeys: this.state.openKeys,
        }

    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        onSelect={this.onSelect}
        selectedKeys={selectedKeys}
        onClick={
          isMobile
            ? () => {
                onCollapseChange(true)
              }
            : undefined
        }
        {...menuProps}
      >
        {this.generateMenus(menuTree)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default SiderMenu
