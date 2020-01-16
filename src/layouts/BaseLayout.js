import React, {PureComponent, Fragment} from "react"

class BaseLayout extends PureComponent {
  render() {
    return <Fragment>11322</Fragment>
  }
}

export default BaseLayout




/**
 * PureComponent：以浅层对比props和state的方法实现了shouldComponentUpdate()函数；
 * Fragment：在不额外创建DOM元素的情况下，让render()方法中返回多个元素
 */
