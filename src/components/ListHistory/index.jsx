import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLastFive } from '../../features/api/callSlice';

import './style.scss';

const ListHistory = () => {
  const rosterId = useSelector((state) => state.financeData?.currentRoster?.roster);
  const data = useSelector((state) => state.financeData?.lastFiveRoster);
  const sendData = useSelector((state) => state.financeData?.sendData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (rosterId?.length) {
      dispatch(fetchLastFive(rosterId));
    }
  }, [sendData, dispatch, rosterId])

  return (
    <>
      <div className='elementlist'>
        <div className='elementlist-maplist'>
          {data?.map((values) => (
            <li name='listData' key={values._id} className='elementlist-list'>
              <div className='elementlist-list-each'>
                <div className='elementlist-list-each_input'>
                  <div
                    name='displaylastValue'
                    className='elementlist-list-each_input_value'
                    style={
                      values.value >= 0
                        ? { color: 'rgb(27, 214, 27)' }
                        : { color: 'rgb(252, 15, 15)' }
                    }
                  >
                    {values.value}
                  </div>
                  <div>{values.currency}</div>
                </div>
                <div className='elementlist-list-each_info'>
                  <div className='elementlist-list-each_info_category'>
                    Categorie: {values.categorie}
                  </div>
                  <div className='elementlist-list-each_info_date'>
                    {new Date(values.createdAt)
                      .toString()
                      .split(' ')
                      .splice(0, 4)
                      .join(' ')}
                  </div>
                  <div className='elementlist-list-each_info_hour'>
                    {new Date(values.createdAt)
                      .toString()
                      .split(' ')
                      .splice(4, 1)}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListHistory;
