import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { MyLayout } from '@/components';

const { Sider } = MyLayout;

class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  };
  render() {
    const { isMobile } = this.state;
    return (
      <Fragment>
        <Layout>{isMobile ? <div>Mobile</div> : <Sider></Sider>}</Layout>
      </Fragment>
    );
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default PrimaryLayout;
