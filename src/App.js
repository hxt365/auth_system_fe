import React, { lazy } from 'react';
import './App.scss';
import { Spin } from 'antd';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HOME, LOGIN, CHANGE_PASSWORD, RESET_PASSWORD, SIGNUP } from 'constants/index';

const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const ChangePassword = lazy(() => import('views/ChangePassword'));
const ResetPassword = lazy(() => import('views/ResetPassword'));
const Signup = lazy(() => import('views/Signup'));
const HomeLayout = lazy(() => import('components/HomeLayout'));

function App() {
  return (
    <React.Suspense fallback={<Spin size="large" />}>
      <Switch>
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={SIGNUP} component={Signup} />
        <Route exact path={RESET_PASSWORD} component={ResetPassword} />
        <HomeLayout>
          <React.Suspense fallback={<Spin size="large" />}>
            <Route exact path={HOME} component={Home} />
            <Route exact path={CHANGE_PASSWORD} component={ChangePassword} />
          </React.Suspense>
        </HomeLayout>
        <Redirect to={LOGIN} />
      </Switch>
    </React.Suspense>
  );
}

export default App;
