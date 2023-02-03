import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchLastValue, fetchTotal } from '../../features/api/callSlice';

import './style.scss';

const DisplayTotal = () => {
  const rosterId = useSelector((state) => state.financeData?.currentRoster?.roster);
  const lastValue = useSelector((state) => state.financeData?.lastValue?.value);
  const values = useSelector((state) => state.financeData?.totalValues?.total);

  const totalValues = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(values);

  const dispatch = useDispatch();

  useEffect(() => {
    if (rosterId?.length){
      dispatch(fetchTotal(rosterId));
      dispatch(fetchLastValue(rosterId));
    }
  }, [dispatch, rosterId, values])

  return (
    <main className='displaymain'>
      <section
        key={rosterId}
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
      <section className='displaylast'>
        <div className='displaylast-info'>
          <p className='displaylast-info_text'>Last value entered:</p>
          <p
            key={rosterId}
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
    </main>
  );
};

export default DisplayTotal;
