import EnterValue from '../../components/EnterValue';
import ListHistory from '../../components/ListHistory';
import DisplayTotal from '../../components/DisplayTotal';

import './styles.scss';

const Home = () => {
  return (
    <div className='home'>
      <DisplayTotal />
      <EnterValue />
      <ListHistory />
    </div>
  );
};

export default Home;
