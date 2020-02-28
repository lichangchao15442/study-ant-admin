import React from 'react'
import PropTypes from 'prop-types'
import { Table, Tag } from 'antd'
import { Color } from 'utils'
import styles from './comments.less'

const status = {
  1: {
    color: Color.green,
    text: 'APPROVED',
  },
  2: {
    color: Color.yellow,
    text: 'PENDING',
  },
  3: {
    color: Color.red,
    text: 'REJECTED',
  },
}
function Comments({ data }) {
  const columns = [
    {
      title: 'avatar',
      dataIndex: 'avatar',
      width: 48,
      className: styles.avatarcolumn,
      render: text => (
        <span
          className={styles.avatar}
          style={{ backgroundImage: `url(${text})` }}
        ></span>
      ),
    },
    {
      title: 'content',
      dataIndex: 'content',
      render: (text, item) => (
        <div>
          <h5 className={styles.name}>{item.name}</h5>
          <p className={styles.content}>{text}</p>
          <div className={styles.daterow}>
            <Tag color={status[item.status].color}>
              {status[item.status].text}
            </Tag>
            <span className={styles.date}>{item.date}</span>
          </div>
        </div>
      ),
    },
  ]
  return (
    <div className={styles.comments}>
      <Table
        columns={columns}
        dataSource={data.filter((item, index) => index < 3)}
        showHeader={false}
        pagination={false}
        rowKey={(item, index) => index}
      />
    </div>
  )
}

Comments.propTypes = {
  data: PropTypes.array,
}

export default Comments
