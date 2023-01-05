import { useEffect, useState } from 'react';
import { DataFilter } from '../../../features/setDataFilter';
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

import './styles.scss';

const ChartRadar = () => {
  const [dataRadar, setDataRadar] = useState([]);

  const eventFilter = DataFilter();

  useEffect(() => {
    setDataRadar(eventFilter);
  }, [eventFilter]);

  return (
    <div className='radarchart'>
      <RadarChart
        className='radarchart-graph'
        outerRadius={120}
        width={320}
        height={300}
        data={dataRadar}
        margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey='categorie' />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name='Test'
          dataKey='value'
          stroke='rgba(52, 153, 255, 1)'
          fill='rgba(52, 153, 255, 1)'
          fillOpacity={0.2}
        />
      </RadarChart>
    </div>
  );
};

export default ChartRadar;
