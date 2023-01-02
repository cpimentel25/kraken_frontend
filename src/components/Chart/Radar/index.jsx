import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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

  const userData = useSelector((state) => state.financeData.data);
  const categorie = useSelector((state) => state.financeData.categorie);

  const data = userData.map((userData) => ({
    categorie: userData.categorie,
    value: userData.value[0],
  }));

  useEffect(
    () => {
      dataFilter();
    },
    // eslint-disable-next-line
    [userData]
  );

  function dataFilter() {
    const newAray = [];

    categorie.forEach((element) => {
      const value = Math.abs(data
        .filter((data) => data.categorie === element)
        .reduce((acc, value) => acc + value.value, 0));
      newAray.push({ categorie: element, value });
    });

    // console.log('dataFilter: ', newAray);
    return setDataRadar(newAray);
  }

  // console.log('data Show: ', dataRadar);

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
