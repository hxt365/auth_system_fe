import React from 'react';
import './ChangePassword.scss';
import ChangePasswordForm from 'components/ChangePasswordForm';

function ChangePassword() {
  return (
    <section className="change-password">
      <h2>Important: Never tell your girlfriend the password!</h2>
      <ChangePasswordForm />
    </section>
  );
}

export default ChangePassword;
