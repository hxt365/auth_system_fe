// @flow

import React, { useState } from 'react';
import { Modal, Result, Button } from 'antd';
import './AppLayout.scss';
import { SUCCESS, ERROR } from 'constants/message';

type PropsType = {
  children: any,
};

// eslint-disable-next-line no-unused-vars
type MessageType = {
  status: SUCCESS | ERROR,
  title: String,
};

// eslint-disable-next-line no-unused-vars
type UserType = {
  username: String,
  first_name: String,
  last_name: String,
  is_authenticated: Boolean,
};

export const AppContext = React.createContext(null);

function AppLayout(props: PropsType) {
  const [message: MessageType, setMessage] = useState({
    status: '',
    title: '',
  });

  const [user: UserType, setUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    is_authenticated: false,
  });

  const { children } = props;

  const clickHandler = e => {
    e.preventDefault();
    setMessage({
      status: '',
      title: '',
    });
  };

  return (
    <AppContext.Provider value={{ user, setUser, setMessage }}>
      {message.status && message.title ? (
        <Modal visible centered closable={false} footer={null} bodyStyle={{ padding: '1rem' }}>
          <Result
            status={message.status}
            title={message.title}
            className="message-result"
            extra={[
              <Button type="primary" onClick={clickHandler}>
                I understood
              </Button>,
            ]}
          />
        </Modal>
      ) : null}
      {children}
    </AppContext.Provider>
  );
}

export default AppLayout;
