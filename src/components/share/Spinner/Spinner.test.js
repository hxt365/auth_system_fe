import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

describe('test Spinner', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<Spinner />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
