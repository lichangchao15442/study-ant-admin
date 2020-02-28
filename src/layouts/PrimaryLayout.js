import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Drawer, BackTop } from 'antd'
import { MyLayout } from '@/components'
import { connect } from 'dva'
import { langFromPath, pathMatchRegexp } from 'utils'
import withRouter from 'umi/withRouter'
import store from 'store'
import config from 'config'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { GlobalFooter } from 'ant-design-pro'
import Error from '../pages/error'
import styles from './PrimaryLayout.less'

const { Content } = Layout
const { Sider, Header, Bread } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
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
    const { isMobile } = this.state
    // console.log('this.props', this.props)
    const { app, location, dispatch, children } = this.props
    const { theme, collapsed, notifications } = app
    const { onCollapseChange } = this
    const user = store.get('user') || {}
    const routeList = store.get('routeList') || []
    const permissions = store.get('permissions') || {}

    const lang = langFromPath(location.pathname)
    // 处理国际化name属性（默认name为english形式）
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

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')

    // 当前路由
    const currentRoute = newRouteList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    // 当前用户是否有访问该路由的权限
    const hasPermission = currentRoute
      ? permissions.visit.includes(currentRoute.id)
      : false

    const headerProps = {
      collapsed,
      username: user.username,
      avatar: user.avatar,
      notifications,
      fixed: config.fixedHeader,
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onCollapseChange,
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
              placement="left"
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false}></Sider>
            </Drawer>
          ) : (
            <Sider {...siderProps}></Sider>
          )}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps}></Header>
            <Content className={styles.content}>
              <Bread routeList={newRouteList} />
              {hasPermission ? children : <Error />}
            </Content>
            <BackTop />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
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
