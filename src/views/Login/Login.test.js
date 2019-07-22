import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Login from './Login';

describe('test Login', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
