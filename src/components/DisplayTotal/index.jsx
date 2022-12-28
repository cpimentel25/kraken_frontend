import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import './style.scss';

const DisplayTotal = () => {
  const [lastValue, setLastValue] = useState([]);

  const data = useSelector((state) => state.financeData.data);
  const lastValueData = data?.at();

  const newTotal = data?.reduce((acc, act) => acc + parseFloat(act.value), 0);
  const newTotalValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(newTotal);

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
    <div key={data?.user} className='displaytotal'>
      {lastValue > 0 ? (
        <FontAwesomeIcon className='displaytotal-icon_up' icon={faUpLong} />
      ) : (
        <FontAwesomeIcon
          className='displaytotal-icon_down'
          icon={faDownLong}
        />
      )}
      <div className='displaytotal-values'>
        <h3 className='displaytotal-values_newtotal'>{newTotalValue}</h3>
        <p
          key={data?.id}
          className='displaytotal-values_lastvalue'
          style={
            lastValue > 0
              ? { color: 'rgb(27, 214, 27)' }
              : { color: 'rgb(252, 15, 15)' }
          }
        >
          ${lastValue}
        </p>
      </div>
    </div>
  );
};

export default DisplayTotal;
