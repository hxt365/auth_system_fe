// @flow

import React from 'react';
import { Layout } from 'antd';
import Navigation from 'components/Navigation';
import './HomeLayout.scss';
import Logo from 'assets/pictures/logo.png';

type PropsType = {
  children: any,
};

function HomeLayout(props: PropsType) {
  const { Header, Footer, Content } = Layout;
  const { children } = props;

  return (
    <Layout className="homelayout">
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo">
          <img src={Logo} alt="Teko's logo" />
        </div>
        <Navigation />
      </Header>
      <Content className="content">
        <div className="wrapper">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>HXT365 @Teko2019</Footer>
    </Layout>
  );
}

export default HomeLayout;
