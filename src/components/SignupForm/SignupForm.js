// @flow

import React, { useState, useContext } from 'react';
import { Form, Input, Tooltip, Icon, Checkbox, Button, Row } from 'antd';
import './SignupForm.scss';
import { AppContext } from 'components/AppLayout';
import { SUCCESS, ERROR } from 'constants/message';
import { authServices } from 'services';
import { LOGIN } from 'constants/route';
import { minLength, maxLength, containsValidCharacters, onlyLetters } from 'validators';
import { signupFormType } from 'type';
import {
  firstNameItemLayout,
  lastNameItemLayout,
  tailFormItemLayout,
  formItemLayout,
} from './Layout';

type PropsType = {
  form: any,
};

function SignupForm(props: PropsType) {
  const state = useContext(AppContext);

  const [dirty, setDirty] = useState(false);

  const { form } = props;
  const { getFieldDecorator } = form;

  const signup = async (data: signupFormType) => {
    const res = await authServices.signup(data);
    if (res.status === 201) {
      state.setMessage({
        status: SUCCESS,
        title:
          // eslint-disable-next-line max-len
          'You successfully registered! We sent you an verification email, just check it out nowwwww',
        button: 'Thank you, admin!',
        redirect: LOGIN,
      });
    } else {
      state.setMessage({
        status: ERROR,
        title: 'Username or email was taken',
        button: 'Let me try again',
        redirect: '',
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err)
        signup({
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          password_2: values.confirm,
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

  const validateUsername = (rule, value, callback) => {
    if (value) {
      if (!containsValidCharacters(value))
        callback('Username may contain only letters, numbers, and @/./+/-/_ characters');
      if (!minLength(value, 6)) callback('Ensure username has at least 6 characters');
      if (!maxLength(value, 150)) callback('Ensure username has no more than 150 characters');
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

  const validateName = (rule, value, callback) => {
    if (value) {
      if (!onlyLetters(value)) callback('Invalid name');
      if (!maxLength(value, 15))
        callback('Ensure first nam/ last name has no more than 15 characters');
    }
    callback();
  };

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit} className="signup-form">
      <Row type="flex" className="row">
        <Form.Item label="Name" {...firstNameItemLayout}>
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'Please input your first name!', whitespace: true },
              { validator: validateName },
            ],
          })(<Input placeholder="First name" />)}
        </Form.Item>
        <Form.Item {...lastNameItemLayout}>
          {getFieldDecorator('lastName', {
            rules: [
              { required: true, message: 'Please input your last name!', whitespace: true },
              { validator: validateName },
            ],
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
        hasFeedback
      >
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: 'Please input your username!' },
            { validator: validateUsername },
          ],
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
            { required: true, message: 'Please input your password!' },
            {
              validator: validateToNextPassword,
            },
            {
              validator: validatePassword,
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
        <Button
          type="primary"
          onClick={handleSubmit}
          id="signup-form__button"
          disabled={!form.getFieldValue('agreement')}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

const wrapper = Form.create({ name: 'signupForm' })(SignupForm);

export default wrapper;
