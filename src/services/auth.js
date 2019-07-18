import {
  LOGIN,
  LOGOUT,
  REFRESH,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  SIGNUP,
  CONFIRM_EMAIL,
} from 'constants/api';

import customAxios from './axios';

const login = async data => {
  const loginForm = {
    username: data.username,
    password: data.password,
  };
  const res = await customAxios.post(LOGIN, loginForm).catch(err => err);
  return res;
};

const logout = async () => {
  const res = await customAxios.post(LOGOUT).catch(err => err);
  return res;
};

const resetPassword = async data => {
  const resetPasswordForm = {
    username: data.username,
    email: data.email,
  };
  const res = await customAxios.post(RESET_PASSWORD, resetPasswordForm).catch(err => err);
  return res;
};

const refresh = async () => {
  const res = await customAxios.post(REFRESH).catch(err => err);
  return res;
};

const changePassword = async data => {
  const changePasswordForm = {
    old_pass: data.current_password,
    new_pass: data.password,
    new_pass_2: data.confirm,
  };
  const res = await customAxios.post(CHANGE_PASSWORD, changePasswordForm).catch(err => err);
  return res;
};

const signup = async data => {
  const signupForm = {
    username: data.username,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    password: data.password,
    password_2: data.confirm,
  };
  const res = await customAxios.post(SIGNUP, signupForm).catch(err => err);
  return res;
};

const confirmEmail = async token => {
  const link = `${CONFIRM_EMAIL + token  }/`;
  const res = await customAxios.post(link).catch(err => err);
  return res;
};

export default {
  login,
  logout,
  refresh,
  resetPassword,
  changePassword,
  signup,
  confirmEmail,
};
