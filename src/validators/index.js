// @flow

const minLength = (value: String, limit: Number): Boolean => {
  if (value.length >= limit) return true;
  return false;
};

const maxLength = (value: String, limit: Number): Boolean => {
  if (value.length <= limit) return true;
  return false;
};

const containsValidCharacters = (value: String): Boolean => {
  // Only letters, numbers, and @/./+/-/_ characters
  const regex = /^[\w.@+-]+$/;
  return regex.test(value);
};

const onlyLetters = (value: String): Boolean => {
  // Only letters
  const regex = /^[A-Za-z]+$/;
  return regex.test(value);
};

export { minLength, maxLength, containsValidCharacters, onlyLetters };
