import React, { PureComponent, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import config from '@/utils/config'
import { Loader } from '@/components'
import withRouter from 'umi/withRouter'
import { queryLayout } from '@/utils/index'
import PrimaryLayout from './PrimaryLayout'
import PublicLayout from './PublicLayout'
import { connect } from 'dva'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'//直接引入nprogress的样式文件
import PropTypes from 'prop-types'

import './BaseLayout.less' // 自定义nprogress样式可以随主题颜色改变

const LayoutMap = {
  primary: PrimaryLayout,
  public: PublicLayout,
}

@withRouter
@connect(({ loading }) => ({
  loading,
}))
class BaseLayout extends PureComponent {
  previousPath = ''

  render() {
    const { loading, children, location } = this.props
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]

    // 路由改变加载进度条
    const currentPath = location.pathname + location.search
    if (currentPath !== this.previousPath) {
      NProgress.start()
    }

    // 全局的所有请求加载完毕后，结束进度条
    if (!loading.global) {
      NProgress.done()
      this.previousPath = currentPath
    }

    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        <Container>{children}</Container>
      </Fragment>
    )
  }
}

BaseLayout.propTypes = {
  loading: PropTypes.object
}

export default BaseLayout
