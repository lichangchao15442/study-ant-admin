import { Component } from 'react'
import PropTypes from 'prop-types'
import Loader from '../Loader/Loader'
import classnames from 'classnames'
import styles from './Page.less'

class Page extends Component {
  render() {
    const { children, loading = false, inner = false, className } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }
    return (
      <div
        className={classnames(className, { [styles.contentInner]: inner })}
        style={loading ? loadingStyle : null}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
}

export default Page
