import ChartLiner from '../../components/Chart/Liner';
import ChartRadar from '../../components/Chart/Radar';

import './styles.scss';

const Charts = () => {
  return (
    <div className='charts'>
      <ChartLiner />
      <ChartRadar />
    </div>
  );
};

export default Charts;
