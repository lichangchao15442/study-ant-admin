import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import {
  arrayToTree,
  addLangPrefix,
  pathMatchRegexp,
  queryAncestors,
} from 'utils'
import { Icon as LeagcyIcon } from '@ant-design/compatible'
import Navlink from 'umi/navlink'
import store from 'store'
import withRouter from 'umi/withRouter'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [], //只有一个元素
  }

  // 点击菜单，收起其他展开的所有菜单，只展开当前父级菜单，保持菜单聚焦简洁
  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.filter(_ => !_.menuParentId).map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )
    let newOpenKeys = openKeys // Submenu里面又嵌套Submenu的情况
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }
    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }
  generateMenus = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <LeagcyIcon type={item.icon} />}
                <span>{item.name}</span>
              </Fragment>
            }
          >
            {this.generateMenus(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={addLangPrefix(item.route) || '#'}>
            {item.icon && <LeagcyIcon type={item.icon} />}
            <span>{item.name}</span>
          </Navlink>
        </Menu.Item>
      )
    })
  }
  render() {
    const {
      menus,
      theme,
      isMobile,
      collapsed,
      onCollapseChange,
      location,
    } = this.props
    const { openKeys } = this.state

    // 生成菜单式数据（树型结构）
    const menuTree = arrayToTree(menus, 'id', 'menuParentId')

    // 点击某个菜单可以跳转到相应路由路由，同样，直接改变路由时，菜单也应该选中相应菜单
    // 根据当前路由，找出当前菜单
    const currentMenu = menus.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )
    // 根据当前菜单找出其祖先元素
    const selectedKeys = currentMenu
      ? queryAncestors(menus, currentMenu, 'menuParentId').map(_ => _.id)
      : []

    const menuProps = collapsed ? {} : { openKeys: this.state.openKeys }
    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
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
  collapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default SiderMenu
