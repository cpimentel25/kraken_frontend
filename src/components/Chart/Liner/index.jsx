import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

import './styles.scss';

const ChartLiner = () => {
  const userData = useSelector((state) => state.financeData.data);
  const data = userData.map(data => ({name: 'A', uv: data.value[0]}));

  return (
    <div className='chart'>
      <div className='chart-graph'>
        <LineChart
          width={320}
          height={260}
          data={data}
          margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
        >
          <Line type='monotone' dataKey='uv' stroke='rgba(52, 153, 255, 1)' />
          <Line type='monotone' dataKey='pv' stroke='rgba(255, 166, 46, 1)' />
          <CartesianGrid stroke="rgb(70, 70, 70)" strokeDasharray="3 3" />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default ChartLiner;
