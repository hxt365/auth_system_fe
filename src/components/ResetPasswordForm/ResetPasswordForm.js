// @flow

import React, { useEffect } from 'react';
import { Form, Icon, Button, Input } from 'antd';
import './ResetPasswordForm.scss';
import { hasErrors } from 'helpers/component';

type PropsType = {
  form: any,
};

function ResetPasswordForm(props: PropsType) {
  useEffect(() => {
    props.form.validateFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
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
