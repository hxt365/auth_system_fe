import React from 'react';
import toJson from 'enzyme-to-json';
import { shallow, mount } from 'enzyme';
import { authServices } from 'services';
import { BrowserRouter } from 'react-router-dom';
import ConfirmEmail from './ConfirmEmail';

describe('test ConfirmEmail', () => {
  it('test snapshot', () => {
    const wrapper = shallow(<ConfirmEmail />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('make sure confirmEmail called once', () => {
    const confirmEmail = jest.spyOn(authServices, 'confirmEmail').mockImplementation(() => {});
    const wrapper = mount(
      <BrowserRouter>
        <ConfirmEmail />
      </BrowserRouter>,
    );
    expect(confirmEmail).toBeCalledTimes(1);
    confirmEmail.mockClear();
    wrapper.unmount();
  });
});
