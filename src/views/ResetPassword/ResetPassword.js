import React from 'react';
import './ResetPassword.scss';
import ResetPasswordForm from 'components/ResetPasswordForm';
import { Link } from 'react-router-dom';
import { LOGIN } from 'constants/index';

function ResetPassword() {
  return (
    <section className="reset-password">
      <h2>We will send you an email containing new password</h2>
      <ResetPasswordForm />
      <Link className="reset-password__link" to={LOGIN}>
        Remember out your password?
      </Link>
    </section>
  );
}

export default ResetPassword;
