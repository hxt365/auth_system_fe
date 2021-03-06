// @flow

import React, { useState, useEffect } from 'react';
import { Modal, Result, Button } from 'antd';
import './AppLayout.scss';
import { SUCCESS, ERROR } from 'constants/message';
import { withRouter } from 'react-router-dom';
import { authServices } from 'services';
import { LOGIN } from 'constants/route';

const COUNTDOWN = parseInt(process.env.REACT_APP_COUNTDOWN, 10);

type PropsType = {
  children: React.ReactElement,
  history: any,
};

// eslint-disable-next-line no-unused-vars
type MessageType = {
  status: SUCCESS | ERROR,
  title: String,
  button: String,
  redirect: Boolean,
};

// eslint-disable-next-line no-unused-vars
type UserType = {
  username: String,
  firstName: String,
  lastName: String,
  is_authenticated: String,
};

export const AppContext = React.createContext(null);

const initialMessage = {
  status: '',
  title: '',
  button: '',
  redirect: '',
};

const initialUser = {
  username: '',
  firstName: '',
  lastName: '',
  is_authenticated: '',
};

function AppLayout(props: PropsType) {
  const [message: MessageType, setMessage] = useState(initialMessage);

  const [user: UserType, setUser] = useState(initialUser);

  useEffect(() => {
    (async function IFE() {
      const res = await authServices.refresh();
      if (res.status === 200) {
        setUser({
          username: res.data.username,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          is_authenticated: true,
        });
      }
    })();
  }, []);

  useEffect(() => {
    // Auto logout user
    setTimeout(() => {
      if (user.is_authenticated) setUser(initialUser);
    }, COUNTDOWN);
  }, [user]);

  const { children } = props;

  const clickHandler = e => {
    e.preventDefault();
    if (message.redirect === LOGIN) setUser(initialUser);
    if (message.redirect) props.history.push(message.redirect);
    setMessage(initialMessage);
  };

  return (
    <AppContext.Provider value={{ user, setUser, setMessage }}>
      {message.status && message.title ? (
        <Modal visible centered closable={false} footer={null} bodyStyle={{ padding: '1rem' }}>
          <Result
            status={message.status}
            title={message.title}
            className="message-result"
            extra={
              message.button ? (
                <Button key="btn" type="primary" onClick={clickHandler}>
                  {message.button}
                </Button>
              ) : null
            }
          />
        </Modal>
      ) : null}
      {children}
    </AppContext.Provider>
  );
}

export default withRouter(AppLayout);
