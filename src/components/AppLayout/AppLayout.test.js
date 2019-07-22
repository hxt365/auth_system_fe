import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { authServices } from 'services';
import { BrowserRouter } from 'react-router-dom';
import AppLayout from './AppLayout';

describe('test AppLayout', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<AppLayout />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('make sure refresh called once', () => {
    const refresh = jest.spyOn(authServices, 'refresh').mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>,
    );
    expect(refresh).toBeCalledTimes(1);
    refresh.mockClear();
    wrapper.unmount();
  });
});
