// @flow

type loginFormType = {|
  username: String,
  passwrod: String,
  captcha: ?String,
|};

type resetPasswordType = {|
  username: String,
  email: String,
|};

type changePasswordFormType = {|
  old_pass: String,
  new_pass: String,
  new_pass_2: String,
|};

type signupFormType = {|
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  password_2: String,
|};

export type { loginFormType, resetPasswordType, changePasswordFormType, signupFormType };
