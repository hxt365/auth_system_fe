// @flow

import React, { useContext, useState, useRef } from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD, SIGNUP } from 'constants/route';
import './LoginForm.scss';
import { authServices } from 'services';
import { AppContext } from 'components/AppLayout';
import { ERROR } from 'constants/message';
import { loginFormType } from 'type';
import ReCAPTCHA from 'react-google-recaptcha';

const reCaptchaKey = process.env.REACT_APP_CAPTCHA_KEY;

type PropsType = {
  form: any,
};

function LoginForm(props: PropsType) {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [readyForm, setReadyForm] = useState(true);
  const state = useContext(AppContext);
  const recaptchaRef = useRef(null);
  const { form } = props;
  const { getFieldDecorator } = form;

  const login = async (data: loginFormType) => {
    let hideCaptcha = true;
    const res = await authServices.login(data);
    if (res.status === 200) {
      state.setUser({
        username: res.data.username,
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        is_authenticated: true,
      });
    } else if (res.response.status === 403) {
      state.setMessage({
        status: ERROR,
        title: 'Please verify your account!',
        button: 'I understood',
        redirect: '',
      });
    } else if (res.response.status === 423) {
      state.setMessage({
        status: ERROR,
        title: 'Your account is blocked for 30 minutes',
      });
      setTimeout(() => {
        state.setMessage({
          status: '',
          title: '',
        });
      }, 30 * 60 * 1000);
    } else {
      if (res.response.status === 429) hideCaptcha = false;
      state.setMessage({
        status: ERROR,
        title: res.response.data,
        button: 'Let me try again',
        redirect: '',
      });
    }
    if (recaptchaRef.current) recaptchaRef.current.reset();
    setShowCaptcha(!hideCaptcha);
    if (!hideCaptcha) setReadyForm(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let captcha = null;
    if (recaptchaRef.current) captcha = recaptchaRef.current.getValue();
    props.form.validateFields((err, values) => {
      if (!err)
        login({
          username: values.username,
          password: values.password,
          captcha,
        });
    });
  };

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input.Password
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {showCaptcha ? (
            <ReCAPTCHA
              className="captcha"
              ref={recaptchaRef}
              sitekey={reCaptchaKey}
              onChange={() => setReadyForm(true)}
            />
          ) : null}
          <Button
            type="primary"
            disabled={!readyForm}
            onClick={handleSubmit}
            className="login-form__button"
            id="login-btn"
          >
            Log in
          </Button>
          <Link className="login-form__float-left" to={RESET_PASSWORD}>
            Forgot password
          </Link>
          <span className="login-form__float-right">
            Or&nbsp;
            <Link to={SIGNUP}>register now!</Link>
          </span>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
}

const wrapper = Form.create({ name: 'loginForm' })(LoginForm);

export default wrapper;
