import React from 'react';
import { mount, shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { authServices } from 'services';
import toJson from 'enzyme-to-json';
import LoginForm from './LoginForm';

describe('Testing login feature', () => {
  it('test snapshot', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('submithandler called only once with username and password', () => {
    const loginSpy = jest.spyOn(authServices, 'login').mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#loginForm_username');
    expect(usernameInput).toHaveLength(1);
    const passwordInput = wrapper.find('input#loginForm_password');
    expect(passwordInput).toHaveLength(1);
    const username = 'username';
    const password = 'password';
    const captcha = null;
    usernameInput.simulate('change', { target: { value: username } });
    passwordInput.simulate('change', { target: { value: password } });
    const btn = wrapper.find('button.login-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(loginSpy).toHaveBeenCalledTimes(1);
    expect(loginSpy).toHaveBeenCalledWith({
      username,
      password,
      captcha,
    });
    loginSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty username', () => {
    const loginSpy = jest.spyOn(authServices, 'login');
    const wrapper = mount(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#loginForm_username');
    const passwordInput = wrapper.find('input#loginForm_password');
    usernameInput.simulate('change', { target: { value: '' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    const btn = wrapper.find('button.login-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(loginSpy).toHaveBeenCalledTimes(0);
    loginSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty password', () => {
    const loginSpy = jest.spyOn(authServices, 'login');
    const wrapper = mount(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#loginForm_username');
    const passwordInput = wrapper.find('input#loginForm_password');
    usernameInput.simulate('change', { target: { value: 'username' } });
    passwordInput.simulate('change', { target: { value: '' } });
    const btn = wrapper.find('button.login-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(loginSpy).toHaveBeenCalledTimes(0);
    loginSpy.mockClear();
    wrapper.unmount();
  });
});
