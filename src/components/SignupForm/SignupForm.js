// @flow

import React, { useState } from 'react';
import { Form, Input, Tooltip, Icon, Checkbox, Button, Row } from 'antd';
import './SignupForm.scss';

const formItemLayout = {
  labelCol: {
    sm: { span: 5 },
  },
  wrapperCol: {
    sm: { span: 14 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    sm: {
      span: 7,
      offset: 8,
    },
  },
};

const firstNameItemLayout = {
  labelCol: {
    sm: { span: 10 },
  },
  wrapperCol: {
    sm: { span: 13 },
  },
};

const lastNameItemLayout = {
  wrapperCol: {
    sm: {
      span: 14,
    },
  },
};

type PropsType = {
  form: any,
};

function SignupForm(props: PropsType) {
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
  const { getFieldDecorator } = form;

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="signup-form">
      <Row type="flex" className="row">
        <Form.Item label="Name" {...firstNameItemLayout}>
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'Please input your first name!', whitespace: true }],
          })(<Input placeholder="First name" />)}
        </Form.Item>
        <Form.Item {...lastNameItemLayout}>
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'Please input your last name!', whitespace: true }],
          })(<Input placeholder="Last name" />)}
        </Form.Item>
      </Row>
      <Form.Item
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <span>
            Username&nbsp;
            <Tooltip title="What do you want others to call you?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="E-mail">
        {getFieldDecorator('email', {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Password" hasFeedback>
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
      <Form.Item label="Confirm Password" hasFeedback>
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
        {getFieldDecorator('agreement', {
          valuePropName: 'checked',
        })(
          <Checkbox>
            I have read the&nbsp;
            <a href="https://teko.vn/home/" target="_blank" rel="noopener noreferrer">
              agreement
            </a>
          </Checkbox>,
        )}
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit" disabled={!form.getFieldValue('agreement')}>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

const wrapper = Form.create({ name: 'signupForm' })(SignupForm);

export default wrapper;
