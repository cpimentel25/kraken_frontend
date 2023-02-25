import { useState } from 'react';
import ChartLiner from '../Liner';
import ChartBar from '../ChartBar';
import ChartSelect from '../ChartSelect';

import './styless.scss';

const ChartMain = () => {
  const [dataChart, setDataChart] = useState({});

  const data = (data) => {
    setDataChart(data)
  };

  return (
    <main className='chartmain'>
      <section className='chartmain-section'>
        <div>
          <ChartBar chartSelect={data}/>
        </div>
        <div>
          <ChartLiner dataChart={dataChart}/>
        </div>
        <div>
          <ChartSelect />
        </div>
      </section>
    </main>
  );
};

export default ChartMain;
