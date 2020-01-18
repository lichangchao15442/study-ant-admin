import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import styles from './Sider.less'
import { config } from '@/utils'
import ScrollBar from '../ScrollBar'
import SiderMenu from './Menu'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

class Sider extends PureComponent {
  render() {
    const {
      i18n,
      menus,
      theme,
      isMobile,
      collapsed,
      onThemeChange,
      onCollapseChange,
    } = this.props
    return (
      <Layout.Sider
        width={256}
        theme={theme}
        breakpoint="lg"
        trigger={null}
        collapsible
        collapsed={collapsed}
        onBreakpoint={!isMobile && onCollapseChange}
        className={styles.sider}
      >
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img alt="logo" src={config.logoPath} />
            {<h1>{config.siteName}</h1>}
          </div>
        </div>
        <div className={styles.menuContainer}>
          <ScrollBar options={{ suppressScrollX: true }}>
            <SiderMenu
              menu={menus}
              theme={theme}
              isMobile={isMobile}
              collapsed={collapsed}
              onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>
      </Layout.Sider>
    )
  }
}

Sider.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onThemeChange: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Sider
