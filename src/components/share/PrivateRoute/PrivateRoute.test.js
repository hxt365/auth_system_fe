import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import PrivateRoute from './PrivateRoute';

describe('test PrivateRoute', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<PrivateRoute />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
