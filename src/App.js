import React, { lazy } from 'react';
import './App.scss';
import { Spin } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HOME, LOGIN, LOGOUT, CHANGE_PASSWORD, RESET_PASSWORD, SIGNUP } from 'constants/index';

const Login = lazy(() => import('views/Login'));

function App() {
  return (
    <React.Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Route path={HOME} component={Home} />
        <Route path={CHANGE_PASSWORD} component={ChangePassword} />
        <Route path={RESET_PASSWORD} component={ResetPassword} />
        <Route path={LOGIN} component={Login} />
        <Route path={SIGNUP} component={Signup} />
        <Redirect to={HOME} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
