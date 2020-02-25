import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Breadcrumb, Icon, Switch } from 'antd'
import styles from './Sider.less'
import { config } from '@/utils'
import ScrollBar from '../ScrollBar'
import SiderMenu from './Menu'
import { withI18n, Trans } from '@lingui/react'

const { Header, Content, Footer } = Layout
const { SubMenu } = Menu

@withI18n()
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
            {!collapsed && <h1>{config.siteName}</h1>}
          </div>
        </div>

        <div className={styles.menuContainer}>
          <ScrollBar options={{ suppressScrollX: true }}>
            <SiderMenu
              menus={menus}
              theme={theme}
              isMobile={isMobile}
              collapsed={collapsed}
              onCollapseChange={onCollapseChange}
            />
          </ScrollBar>
        </div>
        {!collapsed && (
          <div className={styles.switchTheme}>
            <span>
              <Icon type="bulb" />
              <Trans>Switch Theme</Trans>
            </span>
            <Switch
              onChange={onThemeChange.bind(
                this,
                theme === 'dark' ? 'light' : 'dark'
              )}
              defaultChecked={theme === 'dark'}
              checkedChildren={i18n.t`Dark`}
              unCheckedChildren={i18n.t`Light`}
            />
          </div>
        )}
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
