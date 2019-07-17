import React, { useContext } from 'react';
import { Result, Icon } from 'antd';
import './Home.scss';
import { AppContext } from 'components/AppLayout';

function Home() {
  const state = useContext(AppContext);

  return (
    <section className="home">
      <Result
        icon={<Icon type="smile" theme="twoTone" className="home__result" />}
        title={`Great, ${`${state.user.first_name} ${state.user.last_name}`}! We are here together.`}
      />
    </section>
  );
}

export default Home;
