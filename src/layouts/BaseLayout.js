import React, { PureComponent, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import config from '@/utils/config';
import { Loader } from '@/components';
import withRouter from 'umi/withRouter';
import { queryLayout } from "@/utils/index"
import PrimaryLayout from "./PrimaryLayout"

const LayoutMap = {
  primary: PrimaryLayout
}

@withRouter
class BaseLayout extends PureComponent {
  render() {
    const { children, location } = this.props;
    const Container = LayoutMap[queryLayout(config.layouts, location.pathname)]

    return (
      <Fragment>
        <Helmet>
          <title>{config.siteName}</title>
        </Helmet>
        <Loader fullScreen />
        <Container>{children}</Container>
      </Fragment>
    );
  }
}

export default BaseLayout;
