import { PureComponent } from 'react'
import { Page } from 'components'
import { Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import List from './components/List'
import { connect } from 'dva'
import { router } from 'utils'
import qs from 'qs'

const { TabPane } = Tabs
const { stringify } = qs

@withI18n()
@connect(({ post, loading }) => ({ post, loading }))
class Post extends PureComponent {
  handleTabClick = key => {
    const { location } = this.props
    const { pathname } = location
    router.push({
      pathname,
      search: stringify({
        status: key,
      }),
    })
  }

  get listProps() {
    const { post, loading, location } = this.props
    const { list, pagination } = post
    const { pathname, query } = location

    return {
      dataSource: list,
      pagination,
      loading: loading.effects['post/query'],
      onChange: page => {
        router.push({
          pathname,
          search: stringify({
            ...query,
            page: page.current,
            pageSize: page.pageSize,
          }),
        })
      },
    }
  }
  render() {
    const { i18n, location } = this.props
    const { query } = location
    return (
      <Page inner>
        <Tabs
          activeKey={query.status === '2' ? '2' : '1'}
          onTabClick={this.handleTabClick}
        >
          <TabPane tab={i18n.t`Published`} key="1">
            <List {...this.listProps} />
          </TabPane>
          <TabPane tab={i18n.t`Unpublished`} key="2">
            <List {...this.listProps} />
          </TabPane>
        </Tabs>
      </Page>
    )
  }
}

export default Post
