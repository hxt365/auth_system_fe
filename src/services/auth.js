// @flow

import {
  LOGIN,
  LOGOUT,
  REFRESH,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  SIGNUP,
  CONFIRM_EMAIL,
} from 'constants/api';

import type {
  loginFormType,
  resetPasswordType,
  changePasswordFormType,
  signupFormType,
} from 'type';

import customAxios from './axios';

const login = async (data: loginFormType) => {
  const res = await customAxios.post(LOGIN, data).catch(err => err);
  return res;
};

const logout = async () => {
  const res = await customAxios.post(LOGOUT).catch(err => err);
  return res;
};

const resetPassword = async (data: resetPasswordType) => {
  const res = await customAxios.post(RESET_PASSWORD, data).catch(err => err);
  return res;
};

const refresh = async () => {
  const res = await customAxios.post(REFRESH).catch(err => err);
  return res;
};

const changePassword = async (data: changePasswordFormType) => {
  const res = await customAxios.post(CHANGE_PASSWORD, data).catch(err => err);
  return res;
};

const signup = async (data: signupFormType) => {
  const res = await customAxios.post(SIGNUP, data).catch(err => err);
  return res;
};

const confirmEmail = async (token: String) => {
  const link = `${CONFIRM_EMAIL + token}/`;
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
