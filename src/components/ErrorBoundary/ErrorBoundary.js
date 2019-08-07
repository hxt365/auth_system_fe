// @flow

import React, { Component } from 'react';
import { Result } from 'antd';

type Props = {
  children: React.ReactNode,
};

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError)
      return <Result status="500" title="Oops!" subTitle="Sorry, the server is crashed." />;
    return children;
  }
}

export default ErrorBoundary;
