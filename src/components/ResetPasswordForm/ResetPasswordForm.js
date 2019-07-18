// @flow

import React, { useEffect, useContext } from 'react';
import { Form, Icon, Button, Input } from 'antd';
import './ResetPasswordForm.scss';
import { authServices } from 'services';
import { hasErrors } from 'helpers/component';
import { AppContext } from 'components/AppLayout';
import { SUCCESS, ERROR } from 'constants/message';
import { HOME } from 'constants/route';

type PropsType = {
  form: any,
};

function ResetPasswordForm(props: PropsType) {
  const state = useContext(AppContext);

  useEffect(() => {
    props.form.validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await authServices.resetPassword(values);
        if (res.status === 200) {
          state.setMessage({
            status: SUCCESS,
            title: 'Please check your mail box!',
            button: 'Thank you, admin!',
            redirect: HOME,
          });
        } else {
          state.setMessage({
            status: ERROR,
            title: 'Please enter your own username and email!',
            button: 'Let me try again',
            redirect: '',
          });
        }
      }
    });
  };

  const { form } = props;
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

  // Only show error after a field is touched.
  const usernameError = isFieldTouched('username') && getFieldError('username');
  const emailError = isFieldTouched('email') && getFieldError('email');
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />,
        )}
      </Form.Item>
      <Form.Item validateStatus={emailError ? 'error' : ''} help={emailError || ''}>
        {getFieldDecorator('email', {
          rules: [
            { required: true, message: 'Please input your Email!' },
            { type: 'email', message: 'Your email is not valid' },
          ],
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="email"
            placeholder="Email"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}

const wrapper = Form.create({ name: 'resetPasswordForm' })(ResetPasswordForm);

export default wrapper;
