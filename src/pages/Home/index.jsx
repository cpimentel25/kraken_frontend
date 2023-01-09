import EnterValue from '../../components/EnterValue';
import ListHistory from '../../components/ListHistory';
import DisplayTotal from '../../components/DisplayTotal';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { fetchValue } from '../../features/api/callSlice';

import './styles.scss';

const Home = () => {
  // const dispatch = useDispatch();

  // const dispatchData = () => {
  //   dispatch(fetchValue());
  // };

  // useEffect(
  //   () => {
  //     dispatchData();
  //   },
  //   // eslint-disable-next-line
  //   []
  // );

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
