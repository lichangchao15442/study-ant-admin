import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'
import { MyLayout } from '@/components'
import { connect } from 'dva'
import { langFromPath } from '@/utils/index'
import withRouter from 'umi/withRouter'
import store from 'store'

const { Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  }
  onCollapseChange = collapsed => {
    this.props.dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed
    })
  }

  render() {
    const { isMobile } = this.state
    // console.log('this.props', this.props)
    const { app, location,dispatch } = this.props
    const { theme, collapsed } = app
    const {onCollapseChange} = this




    // const routeList = store.get("routeList") || []
    const routeList = [
      {
        id: '1',
        icon: 'dashboard',
        name: 'Dashboard',
        zh: {
          name: '仪表盘',
        },
        'pt-br': {
          name: 'Dashboard',
        },
        route: '/dashboard',
      },
      {
        id: '2',
        breadcrumbParentId: '1',
        name: 'Users',
        zh: {
          name: '用户管理',
        },
        'pt-br': {
          name: 'Usuário',
        },
        icon: 'user',
        route: '/user',
      },
      {
        id: '7',
        breadcrumbParentId: '1',
        name: 'Posts',
        zh: {
          name: '用户管理',
        },
        'pt-br': {
          name: 'Posts',
        },
        icon: 'shopping-cart',
        route: '/post',
      },
      {
        id: '21',
        menuParentId: '-1',
        breadcrumbParentId: '2',
        name: 'User Detail',
        zh: {
          name: '用户详情',
        },
        'pt-br': {
          name: 'Detalhes do usuário',
        },
        route: '/user/:id',
      },
      {
        id: '3',
        breadcrumbParentId: '1',
        name: 'Request',
        zh: {
          name: 'Request',
        },
        'pt-br': {
          name: 'Requisição',
        },
        icon: 'api',
        route: '/request',
      },
      {
        id: '4',
        breadcrumbParentId: '1',
        name: 'UI Element',
        zh: {
          name: 'UI组件',
        },
        'pt-br': {
          name: 'Elementos UI',
        },
        icon: 'camera-o',
      },
      {
        id: '45',
        breadcrumbParentId: '4',
        menuParentId: '4',
        name: 'Editor',
        zh: {
          name: 'Editor',
        },
        'pt-br': {
          name: 'Editor',
        },
        icon: 'edit',
        route: '/UIElement/editor',
      },
      {
        id: '5',
        breadcrumbParentId: '1',
        name: 'Charts',
        zh: {
          name: 'Charts',
        },
        'pt-br': {
          name: 'Graficos',
        },
        icon: 'code-o',
      },
      {
        id: '51',
        breadcrumbParentId: '5',
        menuParentId: '5',
        name: 'ECharts',
        zh: {
          name: 'ECharts',
        },
        'pt-br': {
          name: 'ECharts',
        },
        icon: 'line-chart',
        route: '/chart/ECharts',
      },
      {
        id: '52',
        breadcrumbParentId: '5',
        menuParentId: '5',
        name: 'HighCharts',
        zh: {
          name: 'HighCharts',
        },
        'pt-br': {
          name: 'HighCharts',
        },
        icon: 'bar-chart',
        route: '/chart/highCharts',
      },
      {
        id: '53',
        breadcrumbParentId: '5',
        menuParentId: '5',
        name: 'Rechartst',
        zh: {
          name: 'Rechartst',
        },
        'pt-br': {
          name: 'Rechartst',
        },
        icon: 'area-chart',
        route: '/chart/Recharts',
      },
    ]

    const lang = langFromPath(location.pathname)
    const newRouteList = routeList

    // MenuParentId is equal to -1 is not a available menu.
    const menus = newRouteList.filter(_ => _.menuParentId !== '-1')
    const siderProps = {
      theme,
      menus,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(theme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: theme
        })
      }
    }

    return (
      <Fragment>
        <Layout>
          {isMobile ? <div>Mobile</div> : <Sider {...siderProps}></Sider>}
          <div>
            <div>Header</div>
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
