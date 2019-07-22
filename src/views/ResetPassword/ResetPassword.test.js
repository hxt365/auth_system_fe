import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ResetPassword from './ResetPassword';

describe('test ResetPassword', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ResetPassword />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
