import React, { PureComponent, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import config from '@/utils/config';
import { Loader } from '@/components';

class BaseLayout extends PureComponent {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader />
        111
      </Fragment>
    );
  }
}

export default BaseLayout;

/**
 * PureComponent：以浅层对比props和state的方法实现了shouldComponentUpdate()函数；
 * Fragment：在不额外创建DOM元素的情况下，让render()方法中返回多个元素;
 * Helmet：动态修改网页的title；
 */
