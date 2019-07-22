import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import ErrorBoundary from './ErrorBoundary';

describe('test ErrorBoundary', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
