// @flow

import React, { useContext } from 'react';

import { Form, Input, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import { RESET_PASSWORD, SIGNUP } from 'constants/route';
import './LoginForm.scss';
import { authServices } from 'services';
import { AppContext } from 'components/AppLayout';
import { ERROR } from 'constants/message';

type PropsType = {
  form: any,
};

function LoginForm(props: PropsType) {
  const state = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await authServices.login(values);
        if (res.status === 200) {
          state.setUser({
            username: res.data.username,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            is_authenticated: true,
          });
        } else if (res.response.status === 403) {
          state.setMessage({
            status: ERROR,
            title: 'Please verify your account!',
            button: 'I understood',
            redirect: '',
          });
        } else {
          state.setMessage({
            status: ERROR,
            title: 'Username or password is not correct!',
            button: 'Let me try again',
            redirect: '',
          });
        }
      }
    });
  };
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
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
        <Button type="primary" htmlType="submit" className="login-form__button">
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
  );
}

const wrapper = Form.create({ name: 'loginForm' })(LoginForm);

export default wrapper;
