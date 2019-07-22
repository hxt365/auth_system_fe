import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import HomeLayout from './HomeLayout';

describe('test HomeLayout', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<HomeLayout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
