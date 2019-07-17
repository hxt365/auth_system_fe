// @flow

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import './ChangePasswordForm.scss';
import { hasErrors } from 'helpers/component';

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
  const [state, setState] = useState({
    confirmDirty: false,
  });

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setState({ confirmDirty: state.confirmDirty || !!value });
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
    if (value && state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  const { form } = props;
  const { getFieldDecorator, getFieldsError } = form;

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="change-password-form">
      <Form.Item label="Current password" hasFeedback>
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
