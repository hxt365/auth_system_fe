import React, { useContext } from 'react';
import { Menu } from 'antd';
import { HOME, CHANGE_PASSWORD, LOGIN } from 'constants/route';
import { Link } from 'react-router-dom';
import { authServices } from 'services';
import { AppContext } from 'components/AppLayout';

function Navigation() {
  const state = useContext(AppContext);

  const logoutHandler = () => {
    authServices.logout();
    state.setUser({
      username: '',
      firstName: '',
      lastName: '',
      is_authenticated: false,
    });
  };

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={[HOME]}
      style={{ lineHeight: '6.4rem', float: 'right' }}
    >
      <Menu.Item key={HOME}>
        <Link to={HOME}>Home</Link>
      </Menu.Item>
      <Menu.Item key={CHANGE_PASSWORD}>
        <Link to={CHANGE_PASSWORD}>Change password</Link>
      </Menu.Item>
      <Menu.Item key={LOGIN}>
        <Link to={LOGIN} onClick={logoutHandler}>
          Logout
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default Navigation;
