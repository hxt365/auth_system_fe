import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { authServices } from 'services';
import ChangePasswordForm from './ChangePasswordForm';

describe('test ChangePasswordForm', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ChangePasswordForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('submithandler called only once with current password, new password and confirm', () => {
    const changePasswordSpy = jest
      .spyOn(authServices, 'changePassword')
      .mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    expect(curPasswordInput).toHaveLength(1);
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    expect(curPasswordInput).toHaveLength(1);
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    expect(curPasswordInput).toHaveLength(1);
    const curPasswor = '123456';
    const password = '123456';
    const confirm = '123456';
    curPasswordInput.simulate('change', { target: { value: curPasswor } });
    passwordInput.simulate('change', { target: { value: password } });
    confirmInput.simulate('change', { target: { value: confirm } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(1);
    expect(changePasswordSpy).toHaveBeenCalledWith({
      old_pass: curPasswor,
      new_pass: password,
      new_pass_2: confirm,
    });
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty current password', () => {
    const changePasswordSpy = jest.spyOn(authServices, 'changePassword');
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    curPasswordInput.simulate('change', { target: { value: '' } });
    passwordInput.simulate('change', { target: { value: '123456' } });
    confirmInput.simulate('change', { target: { value: '123456' } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(0);
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of empty password', () => {
    const changePasswordSpy = jest.spyOn(authServices, 'changePassword');
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    curPasswordInput.simulate('change', { target: { value: '123456' } });
    passwordInput.simulate('change', { target: { value: '' } });
    confirmInput.simulate('change', { target: { value: '' } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(0);
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of password having length less than 6', () => {
    const changePasswordSpy = jest.spyOn(authServices, 'changePassword');
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    curPasswordInput.simulate('change', { target: { value: '123456' } });
    passwordInput.simulate('change', { target: { value: '12345' } });
    confirmInput.simulate('change', { target: { value: '12345' } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(0);
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of password having length more than 128', () => {
    const changePasswordSpy = jest.spyOn(authServices, 'changePassword');
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    curPasswordInput.simulate('change', { target: { value: '123456' } });
    passwordInput.simulate('change', { target: { value: '1'.repeat(129) } });
    confirmInput.simulate('change', { target: { value: '1'.repeat(129) } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(0);
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });

  it('submithandler not called because of unconsistent passwords', () => {
    const changePasswordSpy = jest.spyOn(authServices, 'changePassword');
    const wrapper = mount(
      <BrowserRouter>
        <ChangePasswordForm />
      </BrowserRouter>,
    );
    const curPasswordInput = wrapper.find('input#changePasswordForm_current_password');
    const passwordInput = wrapper.find('input#changePasswordForm_password');
    const confirmInput = wrapper.find('input#changePasswordForm_confirm');
    curPasswordInput.simulate('change', { target: { value: '123456' } });
    passwordInput.simulate('change', { target: { value: 'rightpassword' } });
    confirmInput.simulate('change', { target: { value: 'wrongpassword' } });
    const btn = wrapper.find('button#change-form__button');
    expect(btn).toHaveLength(1);
    btn.simulate('click');
    expect(changePasswordSpy).toHaveBeenCalledTimes(0);
    changePasswordSpy.mockClear();
    wrapper.unmount();
  });
});
