import React, { lazy } from 'react';
import './App.scss';
import { Route, Redirect, Switch } from 'react-router-dom';
import { HOME, LOGIN, CHANGE_PASSWORD, RESET_PASSWORD, SIGNUP } from 'constants/route';
import Spinner from 'components/share/Spinner';
import AppLayout from 'components/AppLayout';
import PrivateRoute from 'components/share/PrivateRoute';

const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const ChangePassword = lazy(() => import('views/ChangePassword'));
const ResetPassword = lazy(() => import('views/ResetPassword'));
const Signup = lazy(() => import('views/Signup'));
const HomeLayout = lazy(() => import('components/HomeLayout'));

function App() {
  return (
    <AppLayout>
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          <PrivateRoute exact path={LOGIN} component={Login} />
          <PrivateRoute exact path={SIGNUP} component={Signup} />
          <PrivateRoute exact path={RESET_PASSWORD} component={ResetPassword} />
          <HomeLayout>
            <React.Suspense fallback={<Spinner />}>
              <PrivateRoute authRoute exact path={HOME} component={Home} />
              <PrivateRoute authRoute exact path={CHANGE_PASSWORD} component={ChangePassword} />
            </React.Suspense>
          </HomeLayout>
          <Redirect to={LOGIN} />
        </Switch>
      </React.Suspense>
    </AppLayout>
  );
}

export default App;
