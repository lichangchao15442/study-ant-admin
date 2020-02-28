import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button } from 'antd'
import CountUp from 'react-countup'
import { Color } from 'utils'
import styles from './user.less'

const countUpProp = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ', ',
}

function User({ sales = 0, sold = 0, username, avatar }) {
  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.headerinner}>
          <Avatar size="large" src={avatar} />
          <h5 className={styles.username}>{username}</h5>
        </div>
      </div>
      <div className={styles.number}>
        <div className={styles.item}>
          <p>EARNING SALES</p>
          <p style={{ color: Color.green }}>
            <CountUp prefix="$" end={sales} {...countUpProp} />
          </p>
        </div>
        <div className={styles.item}>
          <p>ITEM SOLD</p>
          <p style={{ color: Color.blue }}>
            <CountUp end={sold} {...countUpProp} />
          </p>
        </div>
      </div>
      <div className={styles.footer}>
        <Button type="ghost" size="large">
          View Profile
        </Button>
      </div>
    </div>
  )
}

User.propTypes = {
  sale: PropTypes.number,
  sold: PropTypes.number,
  username: PropTypes.string,
  avatar: PropTypes.string,
}

export default User
