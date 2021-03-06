// @flow

import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import './ChangePasswordForm.scss';
import { hasErrors } from 'helpers/component';
import { AppContext } from 'components/AppLayout';
import { SUCCESS, ERROR } from 'constants/message';
import { authServices } from 'services';
import { LOGIN } from 'constants/route';
import { minLength, maxLength } from 'validators';
import { changePasswordFormType } from 'type';
import { formItemLayout, tailFormItemLayout } from './Layout';

type PropsType = {
  form: any,
};

function ChangePasswordForm(props: PropsType) {
  const state = useContext(AppContext);

  const [dirty, setDirty] = useState(false);

  const { form } = props;
  const { getFieldDecorator, getFieldsError } = form;

  const changePassword = async (data: changePasswordFormType) => {
    const res = await authServices.changePassword(data);
    if (res.status === 200) {
      state.setMessage({
        status: SUCCESS,
        title: 'We changed password for you. Please log in again for security!',
        button: 'Thank you, admin!',
        redirect: LOGIN,
      });
    } else {
      state.setMessage({
        status: ERROR,
        title: res.response.data.non_field_errors,
        button: 'Let me try again',
        redirect: '',
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err)
        changePassword({
          old_pass: values.current_password,
          new_pass: values.password,
          new_pass_2: values.confirm,
        });
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setDirty(dirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter are inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && dirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const validatePassword = (rule, value, callback) => {
    if (value) {
      if (!minLength(value, 6)) callback('Ensure password has at least 6 characters');
      if (!maxLength(value, 128)) callback('Ensure password has no more than 128 characters');
    }
    callback();
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="change-password-form">
      <Form.Item label="Current password">
        {getFieldDecorator('current_password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="New password" hasFeedback>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              validator: validateToNextPassword,
            },
            {
              validator: validatePassword,
            },
          ],
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="Confirm new password" hasFeedback>
        {getFieldDecorator('confirm', {
          rules: [
            {
              required: true,
              message: 'Please confirm your password!',
            },
            {
              validator: compareToFirstPassword,
            },
          ],
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          onClick={handleSubmit}
          id="change-form__button"
          disabled={hasErrors(getFieldsError())}
        >
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
}

const wrapper = Form.create({ name: 'changePasswordForm' })(ChangePasswordForm);

export default wrapper;
