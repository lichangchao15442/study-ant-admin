import { PureComponent } from 'react'
import { Button } from 'antd'
import { Page } from 'components'
import Filter from './components/Filter'
import List from './components/List'

const data = []
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  })
}
class User extends PureComponent {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys)
    this.setState({ selectedRowKeys })
  }

  get listProps() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    }
    return {
      rowSelection,
      data,
    }
  }

  render() {
    const { loading, selectedRowKeys } = this.state

    return (
      <Page inner>
        <Filter />
        {selectedRowKeys.length>0 && (
          <div style={{ marginBottom: 16 }}>
            <span style={{ marginRight: 8 }}>
              {`Selected ${selectedRowKeys.length} items`}
            </span>
            <Button type="primary" onClick={this.start} loading={loading}>
              Reload
            </Button>
          </div>
        )}
        <List {...this.listProps} />
        <div>modal</div>
      </Page>
    )
  }
}

export default User
