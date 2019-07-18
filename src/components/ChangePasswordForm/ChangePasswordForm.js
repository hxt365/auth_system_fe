// @flow

import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import './ChangePasswordForm.scss';
import { hasErrors } from 'helpers/component';
import { AppContext } from 'components/AppLayout';
import { SUCCESS, ERROR } from 'constants/message';
import { authServices } from 'services';
import { LOGIN } from 'constants/route';

const formItemLayout = {
  labelCol: {
    sm: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 3,
      offset: 10,
    },
  },
};

type PropsType = {
  form: any,
};

function ChangePasswordForm(props: PropsType) {
  const state = useContext(AppContext);

  const [dirty, setDirty] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await authServices.changePassword(values);
        if (res.status === 200) {
          state.setMessage({
            status: SUCCESS,
            title: 'We changed password for you. Please log in again for security!',
            button: 'Thank you, admin!',
            redirect: LOGIN,
          });
        } else {
          console.log(res.response.data);
          state.setMessage({
            status: ERROR,
            title: res.response.data.non_field_errors,
            button: 'Let me try again',
            redirect: '',
          });
        }
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setDirty(dirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter are inconsistent!');
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props;
    if (value && dirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { form } = props;
  const { getFieldDecorator, getFieldsError } = form;

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
        <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
}

const wrapper = Form.create({ name: 'changePasswordForm' })(ChangePasswordForm);

export default wrapper;
