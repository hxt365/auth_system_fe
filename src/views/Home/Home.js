import React, { useContext } from 'react';
import { Result, Icon } from 'antd';
import './Home.scss';
import { AppContext } from 'components/AppLayout';

function Home(props) {
  const state = useContext(AppContext);
  const { firstName, lastName } = state ? state.user : props;

  return (
    <section className="home">
      <Result
        icon={<Icon type="smile" theme="twoTone" className="home__result" />}
        title={`Great, ${`${firstName} ${lastName}`}! 
        We are here together.`}
      />
    </section>
  );
}

export default Home;
