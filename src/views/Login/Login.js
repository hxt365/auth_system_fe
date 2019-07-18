import React from 'react';
import LoginForm from 'components/LoginForm';
import Logo from 'assets/pictures/logo.png';
import './Login.scss';

function Login() {
  return (
    <section className="login">
      <img className="login__logo" src={Logo} alt="Teko's logo" />
      <h1>Come in with us!</h1>
      <LoginForm />
    </section>
  );
}

export default Login;
