import { PureComponent } from 'react'
import { Table, Avatar, Modal } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { DropOption } from 'components'
import Link from 'umi/link'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (item, e) => {
    const { onEditItem, onDeleteItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(item)
    } else {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(item.id)
        },
      })
    }
  }

  render() {
    const { i18n, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'avatar',
        key: 'avatar',
        fixed: 'left',
        width: 72,
        render: avatar => <Avatar src={avatar} />,
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>NickName</Trans>,
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: <Trans>Age</Trans>,
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: <Trans>Gender</Trans>,
        dataIndex: 'isMale',
        key: 'isMale',
        render: isMale => (isMale ? 'Male' : 'Female'),
      },
      {
        title: <Trans>Phone</Trans>,
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>Address</Trans>,
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (tag, item) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(item, e)}
              menuOptions={[
                {
                  key: '1',
                  name: i18n.t`Update`,
                },
                {
                  key: '2',
                  name: i18n.t`Delete`,
                },
              ]}
            />
          )
        },
      },
    ]
    return (
      <Table
        {...tableProps}
        columns={columns}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        scroll={{ x: 1200 }}
        rowKey={record => record.id}
        bordered
      />
    )
  }
}

export default List
