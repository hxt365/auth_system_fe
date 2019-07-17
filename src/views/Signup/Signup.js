import React from 'react';
import './Signup.scss';
import SignupForm from 'components/SignupForm';
import { Link } from 'react-router-dom';
import { LOGIN } from 'constants/index';

function Signup() {
  return (
    <section className="signup">
      <Link to={LOGIN} className="signup__link">
        Already have account?
      </Link>
      &nbsp;Or
      <h2>Just a minute..</h2>
      <SignupForm />
    </section>
  );
}

export default Signup;
