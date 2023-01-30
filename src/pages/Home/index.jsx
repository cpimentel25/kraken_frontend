import EnterValue from '../../components/EnterValue';
import ListHistory from '../../components/ListHistory';
import DisplayTotal from '../../components/DisplayTotal';
import SelectRoster from '../../components/SelectRoster';

import './styles.scss';

const Home = () => {

  return (
    <main className='home'>
      <section className='home-section-select'>
        <SelectRoster />
      </section>
      <section className='home-section'>
        <section className='home-section-display'>
          <div className='home-section-display_box'>
            <DisplayTotal />
            <EnterValue />
          </div>
        </section>
        <section className='home-section-chart'>
          <div className='home-section-chart_box'>
          </div>
        </section>
      </section>
      <section className='home-list'>
        <ListHistory />
      </section>
    </main>
  );
};

export default Home;
