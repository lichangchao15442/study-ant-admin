import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { arrayToTree, addLangPrefix } from '@/utils'
import { Icon as LeagcyIcon } from '@ant-design/compatible'
import Navlink from 'umi/navlink'

const { SubMenu } = Menu

class SiderMenu extends PureComponent {
  generateMenus = data => {
    // console.log('generateMenus', data)
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <LeagcyIcon type={item.icon} />}
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
      menu,
      theme,
      isMobile,
      collapsed,
      onCollapseChange,
      location,
    } = this.props
    const menuTree = arrayToTree(menu, 'id', 'menuParentId')
    return <Menu mode="inline" theme={theme}>{this.generateMenus(menuTree)}</Menu>
  }
}
SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default SiderMenu
