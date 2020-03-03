import { PureComponent } from 'react'
import { Button, Popconfirm } from 'antd'
import { Page } from 'components'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'
import { connect } from 'dva'
import { router } from 'utils'
import { stringify } from 'qs'
import { Trans, withI18n } from '@lingui/react'

@withI18n()
@connect(({ user, loading }) => ({ user, loading }))
class User extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { pathname, query } = location
    router.push({
      pathname,
      search: stringify(
        {
          ...query,
          ...newQuery,
        },
        {
          arrayFormat: 'repeat',
        }
      ),
    })
  }

  handleDeleteItems = () => {
    const { user, dispatch } = this.props
    const { selectedRowKeys, list, pagination } = user
    dispatch({
      type: 'user/multiDelete',
      payload: { ids: selectedRowKeys },
    }).then(() => {
      this.handleRefresh({
        page:
          list.length === selectedRowKeys.length && pagination.current > 1
            ? pagination.current - 1
            : pagination.current,
      })
    })
  }

  get filterProps() {
    const { dispatch, location } = this.props
    const { query } = location
    return {
      filter: { ...query },
      onAdd: () => {
        dispatch({ type: 'user/showModal', payload: { modalType: 'create' } })
      },
      onFilterChange: data => {
        this.handleRefresh(data)
      },
    }
  }

  get listProps() {
    const { user, dispatch, loading } = this.props
    const { list, pagination, selectedRowKeys } = user
    return {
      dataSource: list,
      pagination,
      loading: loading.effects['user/query'],
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: { selectedRowKeys: keys },
          })
        },
      },
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onEditItem: item => {
        dispatch({
          type: 'user/showModal',
          payload: { modalType: 'update', currentItem: item },
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'user/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
    }
  }

  get modalProps() {
    const { user, dispatch, loading, i18n } = this.props
    const { modalVisible, modalType, currentItem } = user

    return {
      visible: modalVisible,
      title: `${
        modalType === 'create' ? i18n.t`Create User` : i18n.t`Update User`
        }`,
      centered: true,
      destroyOnClose: true,
      maskClosable: false,
      confirmLoading: loading.effects[`user/${modalType}`],
      item: modalType === 'create' ? {} : currentItem,
      onCancel: () => {
        dispatch({ type: 'user/hideModal' })
      },
      onOk: data => {
        dispatch({ type: `user/${modalType}`, payload: data }).then(() => {
          this.handleRefresh()
        })
      },
    }
  }

  render() {
    const { user, i18n } = this.props
    const { selectedRowKeys } = user

    return (
      <Page inner>
        <Filter {...this.filterProps} />
        {selectedRowKeys.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>
              {`Selected ${selectedRowKeys.length} items`}
            </span>
            <Popconfirm
              title={i18n.t`Are you sure delete these items?`}
              onConfirm={this.handleDeleteItems}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary">
                Remove
              </Button>
            </Popconfirm>
          </div>
        )}
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

export default User
