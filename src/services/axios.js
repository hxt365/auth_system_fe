// @flow

import axios from 'axios';

export const BASE_API_URL: String = `${process.env.REACT_APP_BASE_API_URL}`;

const customAxios = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

customAxios.interceptors.response.use(
  response => response,
  error => {
    // Add logic to handle error here
    console.log(error.response);
    return Promise.reject(error);
  },
);

export default customAxios;
