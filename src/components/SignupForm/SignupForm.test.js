import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { authServices } from 'services';
import SignupForm from './SignupForm';

describe('test SignupForm', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<SignupForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // eslint-disable-next-line max-len
  it('submithandler called only once with username, firstname, lastname, email, password and confirm', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup').mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    expect(usernameInput).toHaveLength(1);
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    expect(firstNameInput).toHaveLength(1);
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    expect(lastNameInput).toHaveLength(1);
    const emailInput = wrapper.find('input#signupForm_email');
    expect(emailInput).toHaveLength(1);
    const passwordInput = wrapper.find('input#signupForm_password');
    expect(passwordInput).toHaveLength(1);
    const confirmInput = wrapper.find('input#signupForm_confirm');
    expect(confirmInput).toHaveLength(1);
    const agreement = wrapper.find('input#signupForm_agreement');
    expect(agreement).toHaveLength(1);
    const username = 'username';
    const firstName = 'Testing';
    const lastName = 'Testing';
    const email = 'testing@example.com';
    const password = 'password';
    const confirm = 'password';
    usernameInput.simulate('change', { target: { value: username } });
    firstNameInput.simulate('change', { target: { value: firstName } });
    lastNameInput.simulate('change', { target: { value: lastName } });
    emailInput.simulate('change', { target: { value: email } });
    passwordInput.simulate('change', { target: { value: password } });
    confirmInput.simulate('change', { target: { value: confirm } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(1);
    expect(signupFormSpy).toHaveBeenCalledWith({
      username,
      firstName,
      lastName,
      email,
      password,
      password_2: confirm,
    });
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of disagreement', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty first name', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: '' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of first name having more than 15 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'a'.repeat(16) } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty last name having more than 15 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'a'.repeat(16) } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty last name', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: '' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty last name', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: '' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of invalid first name', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: '123@sth_' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of invalid last name', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'username' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: '123@sth_' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty username', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: '' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of username having less than 6 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: '12345' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of username having more than 150 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'a'.repeat(151) } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of invalid username', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'hello&gudbye' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'password' } });
    confirmInput.simulate('change', { target: { value: 'password' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of password having less than 6 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'testing' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: '12345' } });
    confirmInput.simulate('change', { target: { value: '12345' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of password having more than 128 characters', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'testing' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: '1'.repeat(129) } });
    confirmInput.simulate('change', { target: { value: '1'.repeat(129) } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of unconsistent passwords', () => {
    const signupFormSpy = jest.spyOn(authServices, 'signup');
    const wrapper = mount(
      <BrowserRouter>
        <SignupForm />
      </BrowserRouter>,
    );
    const usernameInput = wrapper.find('input#signupForm_username');
    const firstNameInput = wrapper.find('input#signupForm_firstName');
    const lastNameInput = wrapper.find('input#signupForm_lastName');
    const emailInput = wrapper.find('input#signupForm_email');
    const passwordInput = wrapper.find('input#signupForm_password');
    const confirmInput = wrapper.find('input#signupForm_confirm');
    const agreement = wrapper.find('input#signupForm_agreement');
    usernameInput.simulate('change', { target: { value: 'testing' } });
    firstNameInput.simulate('change', { target: { value: 'Testing' } });
    lastNameInput.simulate('change', { target: { value: 'Testing' } });
    emailInput.simulate('change', { target: { value: 'testing@example.com' } });
    passwordInput.simulate('change', { target: { value: 'rightpassword' } });
    confirmInput.simulate('change', { target: { value: 'wrongpassword' } });
    agreement.simulate('change', { target: { checked: true } });
    const btn = wrapper.find('button#signup-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(signupFormSpy).toHaveBeenCalledTimes(0);
    signupFormSpy.mockClear();
    wrapper.unmount();
  });
});
