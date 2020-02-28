import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import moment from 'moment'
import styles from './recentSales.less'

const status = {
  1: {
    color: Color.green,
    text: 'SALE',
  },
  2: {
    color: Color.yellow,
    text: 'REJECT',
  },
  3: {
    color: Color.red,
    text: 'TAX',
  },
  4: {
    color: Color.blue,
    text: 'EXTENDED',
  },
}

function RecentSales({ data }) {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      render: tags => <Tag color={status[tags].color}>{status[tags].text}</Tag>,
    },
    {
      title: 'DATE',
      dataIndex: 'date',
      render: text => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'PRICE',
      dataIndex: 'price',
      render: (text, item) => (
        <span style={{ color: status[item.status].color }}>${text}</span>
      ),
    },
  ]
  return (
    <div className={styles.recentsales}>
      <Table
        columns={columns}
        dataSource={data.filter((item, index) => index < 5)}
        pagination={false}
        rowKey={(item, index) => index}
      />
    </div>
  )
}

RecentSales.propTypes = {
  data: PropTypes.array,
}

export default RecentSales
