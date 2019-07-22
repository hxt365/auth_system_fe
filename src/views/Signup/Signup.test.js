import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Signup from './Signup';

describe('test Signup', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<Signup />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
