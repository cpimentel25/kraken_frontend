// import { useState } from 'react';
// import ChartLiner from '../../components/Chart/Liner';
// import ChartRadar from '../../components/Chart/Radar';
// import ChartBar from '../../components/Chart/Bar';

import './styles.scss';

const Charts = () => {
  // const [showChartBar, setShowChartBar] = useState(true);
  // const [showChartRadar, setShowChartRadar] = useState(false);
  // const [showChartLine, setShowChartLine] = useState(false);

  // function showChartSelectBar() {
  //   setShowChartBar(true);
  //   setShowChartRadar(false);
  //   setShowChartLine(false);
  // }

  // function showChartSelectRadar() {
  //   setShowChartBar(false);
  //   setShowChartRadar(true);
  //   setShowChartLine(false);
  // }

  // function showChartSelectLine() {
  //   setShowChartBar(false);
  //   setShowChartRadar(false);
  //   setShowChartLine(true);
  // }

  return (
    <div className='charts'>
      {/* <div className='charts-recharts'>
        {showChartBar ? <ChartBar /> : null}
        {showChartRadar ? <ChartRadar /> : null}
        {showChartLine ? <ChartLiner /> : null}
      </div>
      <div className='charts-button'>
        <button
          className='charts-button_bar'
          key='bar'
          onClick={showChartSelectBar}
          style={
            showChartBar === false
              ? { backgroundColor: 'rgb(80, 80, 80)' }
              : null
          }
        >
          Bar
        </button>
        <button
          className='charts-button_radar'
          key='radar'
          onClick={showChartSelectRadar}
          style={
            showChartRadar === false
              ? { backgroundColor: 'rgb(80, 80, 80)' }
              : null
          }
        >
          Radar
        </button>
        <button
          className='charts-button_line'
          key='line'
          onClick={showChartSelectLine}
          style={
            showChartLine === false
              ? { backgroundColor: 'rgb(80, 80, 80)' }
              : null
          }
        >
          Line
        </button>
      </div> */}
    </div>
  );
};

export default Charts;
