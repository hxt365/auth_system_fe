import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import Home from './Home';

const props = {
  firstName: 'abc',
  lastName: 'xyz',
};

describe('test Home', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<Home {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
