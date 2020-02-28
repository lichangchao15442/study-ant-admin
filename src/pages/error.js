import React from 'react'
import { Icon } from 'antd'
import { Page } from 'components'
import styles from './error.less'

const Error = () => (
  <Page inner>
    <div className={styles.error}>
      <Icon type="frown" />
      <h1>404 Not Found</h1>
    </div>
  </Page>
)

export default Error
