import React, { lazy } from 'react';
import './App.scss';
import { Redirect, Switch } from 'react-router-dom';
import {
  HOME,
  LOGIN,
  CHANGE_PASSWORD,
  RESET_PASSWORD,
  SIGNUP,
  CONFIRM_EMAIL,
} from 'constants/route';
import Spinner from 'components/share/Spinner';
import AppLayout from 'components/AppLayout';
import PrivateRoute from 'components/share/PrivateRoute';

const Login = lazy(() => import('views/Login'));
const Home = lazy(() => import('views/Home'));
const ChangePassword = lazy(() => import('views/ChangePassword'));
const ResetPassword = lazy(() => import('views/ResetPassword'));
const Signup = lazy(() => import('views/Signup'));
const HomeLayout = lazy(() => import('components/HomeLayout'));
const ConfirmEmail = lazy(() => import('views/ConfirmEmail'));

function App() {
  return (
    <AppLayout>
      <React.Suspense fallback={<Spinner />}>
        <Switch>
          <PrivateRoute exact path={LOGIN} component={Login} />
          <PrivateRoute exact path={SIGNUP} component={Signup} />
          <PrivateRoute exact path={RESET_PASSWORD} component={ResetPassword} />
          <PrivateRoute exact path={CONFIRM_EMAIL} component={ConfirmEmail} />
          <HomeLayout>
            <React.Suspense fallback={<Spinner />}>
              <Switch>
                <PrivateRoute authRoute exact path={HOME} component={Home} />
                <PrivateRoute authRoute exact path={CHANGE_PASSWORD} component={ChangePassword} />
                <Redirect to={HOME} />
              </Switch>
            </React.Suspense>
          </HomeLayout>
          <Redirect to={LOGIN} />
        </Switch>
      </React.Suspense>
    </AppLayout>
  );
}

export default App;
