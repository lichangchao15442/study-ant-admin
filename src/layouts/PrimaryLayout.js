import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Drawer } from 'antd'
import { MyLayout } from '@/components'
import { connect } from 'dva'
import { langFromPath } from '@/utils/index'
import withRouter from 'umi/withRouter'
import store from 'store'
import config from 'config'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import styles from './PrimaryLayout.less'

const { Sider, Header } = MyLayout

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
    const { app, location, dispatch } = this.props
    const { theme, collapsed, notifications } = app
    const { onCollapseChange } = this
    const user = store.get('user') || {}
    const routeList = store.get('routeList') || []

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
            <div>Content</div>
            <div>backtop</div>
            <div>globalfooter</div>
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
