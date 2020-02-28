import { PureComponent, Fragment } from 'react'
import { Breadcrumb, Icon } from 'antd'
import PropTypes from 'prop-types'
import { pathMatchRegexp, queryAncestors, addLangPrefix } from 'utils'
import withRouter from 'umi/withRouter'
import Link from 'umi/navlink'
import { withI18n } from '@lingui/react'
import styles from './Bread.less'

@withI18n()
@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = paths => {
    return paths.map((item, key) => {
      const content = item && (
        <Fragment>
          {item.icon && <Icon type={item.icon} style={{ marginRight: 4 }} />}
          {item.name}
        </Fragment>
      )
      return (
        <Breadcrumb.Item key={key}>
          {paths.length - 1 !== key ? (
            <Link to={addLangPrefix(item.route) || '#'}>{content}</Link>
          ) : (
              content
            )}
        </Breadcrumb.Item>
      )
    })
  }
  render() {
    const { routeList, location, i18n } = this.props
    const currentRoute = routeList.find(
      _ => _.route && pathMatchRegexp(_.route, location.pathname)
    )

    const paths = currentRoute
      ? queryAncestors(routeList, currentRoute, 'breadcrumbParentId').reverse()
      : [routeList[0], { id: 404, name: i18n.t`Not Found` }]
    return (
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array,
}

export default Bread
