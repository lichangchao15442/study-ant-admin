import React from 'react'
import CountUp from 'react-countup'
import { Card, Icon } from 'antd'
import PropTypes from 'prop-types'
import styles from './numberCard.less'

function NumberCard({ icon, color, title, number }) {
  return (
    <Card className={styles.numberCard} bodyStyle={{ padding: 10 }}>
      <Icon className={styles.iconWrap} type={icon} style={{ color }} />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            useGrouping
            separator=","
          />
        </p>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
}

export default NumberCard
