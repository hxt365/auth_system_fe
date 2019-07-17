import React from 'react';
import { Result, Icon } from 'antd';
import './Home.scss';

function Home() {
  return (
    <section className="home">
      <Result
        icon={<Icon type="smile" theme="twoTone" className="home__result" />}
        title="Great, we are here together!"
      />
    </section>
  );
}

export default Home;
