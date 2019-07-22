import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ChangePassword from './ChangePassword';

describe('test ChangePassword', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ChangePassword />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
