import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { authServices } from 'services';
import ResetPasswordForm from './ResetPasswordForm';

describe('test ResetPasswordForm', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ResetPasswordForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('submithandler called only once with username and email', () => {
    const resetPasswordSpy = jest.spyOn(authServices, 'resetPassword').mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <ResetPasswordForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#resetPasswordForm_username');
    expect(usernameInput).toHaveLength(1);
    const emailInput = wrapper.find('input#resetPasswordForm_email');
    expect(emailInput).toHaveLength(1);
    const username = 'username';
    const email = 'testing@example.com';
    usernameInput.simulate('change', { target: { value: username } });
    emailInput.simulate('change', { target: { value: email } });
    const btn = wrapper.find('button#reset-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(resetPasswordSpy).toHaveBeenCalledTimes(1);
    expect(resetPasswordSpy).toHaveBeenCalledWith({
      username,
      email,
    });
    resetPasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty username', () => {
    const resetPasswordSpy = jest.spyOn(authServices, 'resetPassword');
    const wrapper = mount(
      <BrowserRouter>
        <ResetPasswordForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#resetPasswordForm_username');
    const emailInput = wrapper.find('input#resetPasswordForm_email');
    usernameInput.simulate('change', { target: { value: '' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    const btn = wrapper.find('button#reset-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(resetPasswordSpy).toHaveBeenCalledTimes(0);
    resetPasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty email', () => {
    const resetPasswordSpy = jest.spyOn(authServices, 'resetPassword');
    const wrapper = mount(
      <BrowserRouter>
        <ResetPasswordForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#resetPasswordForm_username');
    const emailInput = wrapper.find('input#resetPasswordForm_email');
    usernameInput.simulate('change', { target: { value: 'username' } });
    emailInput.simulate('change', { target: { value: '' } });
    const btn = wrapper.find('button#reset-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(resetPasswordSpy).toHaveBeenCalledTimes(0);
    resetPasswordSpy.mockClear();
    wrapper.unmount();
  });
});
