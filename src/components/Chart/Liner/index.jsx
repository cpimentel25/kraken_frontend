import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useSelector } from 'react-redux';

import './styles.scss';

const ChartLiner = () => {
  const userData = useSelector((state) => state.financeData.data);
  // console.log(userData);

  const data = userData.map(data => ({name: 'A', uv: data.value[0]}));
  // console.log(data)

  // const dataTest = [
  //   { name: 'A', uv: 400, pv: 240, amt: 2400 },
  //   { name: 'B', uv: 200, pv: 300, amt: 2000 },
  //   { name: 'C', uv: 0, pv: 100, amt: 1000 },
  //   { name: 'D', uv: 100, pv: 300, amt: 200 },
  //   { name: 'E', uv: 300, pv: 300, amt: 2200 },
  //   { name: 'F', uv: 600, pv: 100, amt: 1200 },
  // ];

  return (
    <div className='chart'>
      <div className='chart-graph'>
        <LineChart
          width={320}
          height={300}
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
