import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { authServices } from 'services';
import App from './App';

it('renders without crashing', () => {
  const refresh = jest.spyOn(authServices, 'refresh').mockImplementation(() => {});
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div,
  );
  refresh.mockClear();
  ReactDOM.unmountComponentAtNode(div);
});
