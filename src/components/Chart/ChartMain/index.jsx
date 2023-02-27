import { useState } from 'react';
import ChartLiner from '../Liner';
import ChartBar from '../ChartBar';
import ChartSelect from '../ChartSelect';
import PrintedData from '../../PrintedData';

import './styless.scss';

const ChartMain = () => {
  const [dataChart, setDataChart] = useState({});

  const data = (data) => {
    setDataChart(data);
  };

  return (
    <main className='chartmain'>
      <section className='chartmain-charts'>
        <div>
          <div>
            <ChartBar chartSelect={data} />
          </div>
          <div>
            <ChartLiner dataChart={dataChart} />
          </div>
          <div>
            <ChartSelect />
          </div>
        </div>
      </section>
      <section className='chartmain-printdata'>
        <PrintedData roster={dataChart} />
      </section>
    </main>
  );
};

export default ChartMain;
