import * as validators from './index';

describe('Test min length validator', () => {
  it('test min length then success', () => {
    expect(validators.minLength('123', 3)).toBeTruthy();
  });

  it('test min length then fail', () => {
    expect(validators.minLength('12', 3)).toBeFalsy();
  });
});

describe('Test max length validator', () => {
  it('test max length 3 then success', () => {
    expect(validators.maxLength('123', 3)).toBeTruthy();
  });

  it('test max length 3 then fail', () => {
    expect(validators.maxLength('1234', 3)).toBeFalsy();
  });
});

describe('Test containing only valid characters validator', () => {
  it('test string (digits, letters, @, +, -, m, .) then success', () => {
    expect(validators.containsValidCharacters('123ashfk.@_+-')).toBeTruthy();
  });

  it('test containing invalid characters then fail', () => {
    expect(validators.containsValidCharacters('!@#$%^&*()`')).toBeFalsy();
  });
});

describe('Test containing only letters validator', () => {
  it('test containing only letters then success', () => {
    expect(validators.onlyLetters('qwertyuiopASDFGHJKLzxcvbnm')).toBeTruthy();
  });

  it('test containg digit then fail', () => {
    expect(validators.onlyLetters('asjfkhk12')).toBeFalsy();
  });

  it('test containg special characters then fail', () => {
    expect(validators.onlyLetters('asj^&fkhk')).toBeFalsy();
  });
});
