// @flow

import React, { useState, useEffect } from 'react';
import { Result, Button, Icon } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import './ConfirmEmail.scss';
import { LOGIN } from 'constants/route';
import { authServices } from 'services';
import Spinner from 'components/share/Spinner';

function ConfirmEmail({ match }: { match: any }) {
  const [confimed, setConfirmed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async function IFE() {
      const { token } = match.params;
      const res = await authServices.confirmEmail(token);
      setLoaded(true);
      if (res.status === 200) setConfirmed(true);
      else setConfirmed(false);
    })();
  }, [match.params]);

  let view;
  if (!loaded) view = <Spinner />;
  else
    view = confimed ? (
      <Result
        icon={<Icon type="safety-certificate" theme="twoTone" />}
        title="Congrats! We're glad you joined us!"
        extra={(
          <Button type="primary">
            <Link to={LOGIN}>Log in</Link>
          </Button>
)}
      />
    ) : (
      <Result
        icon={<Icon type="bug" theme="twoTone" />}
        title="The token is not correct or expired!"
      />
    );

  return <section className="confirm-email">{view}</section>;
}

export default withRouter(ConfirmEmail);
