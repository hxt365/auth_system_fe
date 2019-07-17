import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AppContext } from 'components/AppLayout';
import { LOGIN, HOME } from 'constants/route';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ component: Component, authRoute, ...rest }) {
  const state = useContext(AppContext);

  return authRoute ? (
    <Route
      {...rest}
      render={props =>
        state.user.is_authenticated ? <Component {...props} /> : <Redirect to={LOGIN} />
      }
    />
  ) : (
    <Route
      {...rest}
      render={props =>
        !state.user.is_authenticated ? <Component {...props} /> : <Redirect to={HOME} />
      }
    />
  );
}

export default PrivateRoute;
