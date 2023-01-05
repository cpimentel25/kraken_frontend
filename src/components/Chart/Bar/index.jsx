import { useEffect, useState } from 'react';
// import { DataFilter } from '../../../features/setDataFilter';
import { useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import './styles.scss';
import { DataFilterNoAbs } from '../../../features/setFilter';

const ChartBar = () => {
  const [dataBar, setDataBar] = useState([]);
  const userOne = useSelector((state) => state.financeData.user.profile);

  const eventFilter = DataFilterNoAbs();

  useEffect(() => {
    setDataBar(eventFilter);
  }, [eventFilter]);

  return (
    <div className='barchart'>
      <BarChart
        className='barchart-graph'
        width={320}
        height={280}
        data={dataBar}
        barSize={15}
        margin={{ top: 10, right: 0, bottom: 5, left: 0 }}
      >
        <CartesianGrid strokeDasharray='3' />
        <XAxis dataKey='categorie' />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign='top' height={36} />
        <ReferenceLine y={0} stroke="#fff" />
        <Bar
          name={userOne.firstName}
          dataKey='value'
          fill='rgba(52, 153, 255, 1)'
        />
      </BarChart>
    </div>
  );
};

export default ChartBar;
