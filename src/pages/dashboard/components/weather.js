import React from 'react'
import { Spin } from 'antd'
import PropTypes from 'prop-types'
import styles from './weather.less'

function Weather({ city, temperature, name, icon, loading }) {
  return (
    <Spin spinning={loading}>
      <div className={styles.weather}>
        <div className={styles.left}>
          <div
            className={styles.icon}
            style={{ backgroundImage: `url(${icon})` }}
          ></div>
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.right}>
          <h1 className={styles.temperature}>{`${temperature}°`}</h1>
          <p className={styles.city}>{city}</p>
        </div>
      </div>
    </Spin>
  )
}

Weather.propTypes = {
  city: PropTypes.string,
  temperature: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
}

export default Weather
