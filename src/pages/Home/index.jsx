import EnterValue from '../../components/EnterValue';
import ListHistory from '../../components/ListHistory';
import DisplayTotal from '../../components/DisplayTotal';

import './styles.scss';

const Home = () => {

  return (
    <div className='home'>
      <div className='home-display'>
        <DisplayTotal />
        <EnterValue />
      </div>
      <ListHistory />
    </div>
  );
};

export default Home;
