import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './browser.less'

const status = {
  1: {
    color: Color.green,
  },
  2: {
    color: Color.red,
  },
  3: {
    color: Color.blue,
  },
  4: {
    color: Color.yellow,
  },
}

function Browser({ data }) {
  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: 'percent',
      dataIndex: 'percent',
      render: (tag, item) => <Tag color={status[item.status].color}>{tag}</Tag>,
    },
  ]
  return (
    <div className={styles.browse}>
      <Table
        columns={columns}
        dataSource={data}
        showHeader={false}
        pagination={false}
        rowKey={(item, index) => index}
      />
    </div>
  )
}

Browser.propTypes = {
  data: PropTypes.array,
}

export default Browser
