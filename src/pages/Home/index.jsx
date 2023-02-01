import EnterValue from '../../components/EnterValue';
import ListHistory from '../../components/ListHistory';
import DisplayTotal from '../../components/DisplayTotal';
import SelectRoster from '../../components/SelectRoster';
import ChartHome from '../../components/chartHome';

import './styles.scss';

const Home = () => {
  return (
    <main className='home'>
      <section className='home-select'>
        <SelectRoster />
      </section>
      <section className='home-display'>
        <DisplayTotal />
        <EnterValue />
      </section>
      <section className='home-list'>
        <ListHistory />
        <ChartHome />
      </section>
    </main>
  );
};

export default Home;
