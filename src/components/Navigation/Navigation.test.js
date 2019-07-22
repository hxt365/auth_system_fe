import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('test navigation', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<Navigation />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
