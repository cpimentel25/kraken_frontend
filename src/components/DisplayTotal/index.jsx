import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './style.scss';

const DisplayTotal = () => {
  const [lastValue, setLastValue] = useState([]);

  const data = useSelector((state) => state.financeData?.data);
  const lastValueData = data;

  const values = useSelector((state) => state.financeData?.totalValues?.total)
  const totalValues = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(values);

  const testValue = () => {
    if (lastValueData !== undefined) {
      return setLastValue(lastValueData.value);
    };
  };

  useEffect(() => {
    testValue();
  },
  // eslint-disable-next-line
  [data]);

  return (
    <main>
      <section className='displaylast'>
        <div className='displaylast-info'>
          <p className='displaylast-info_text'>Last value entered:</p>
          <p
            key={data?.id}
            className='displaylast-info_lastvalue'
            style={
              lastValue > 0
                ? { color: 'rgb(27, 214, 27)' }
                : { color: 'rgb(252, 15, 15)' }
            }
          >
            ${lastValue}
          </p>
        </div>
      </section>
      <section
        key={data?.user}
        className='displaytotal'
        // style={
        //   lastValue > 0
        //     ? { background: 'rgb(27, 214, 27, .12)' }
        //     : { background: 'rgb(114, 134, 211)' }
        // }
      >
      <div className='displaytotal-values'>
        <p className='displaytotal-values_newtotal'>{totalValues}</p>
      </div>
      </section>
    </main>
  );
};

export default DisplayTotal;
