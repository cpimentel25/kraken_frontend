import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentData } from '../../features/api/callSlice';
import Pagination from '../Pagination';

import './style.scss';

import Modal from '../Modals/HistoryModal';

const ListHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const totalPage = 15;

  const dispatch = useDispatch();

  const data = useSelector((state) => state.financeData.data);

  const max = data?.length / totalPage;
  const newMax = Math.ceil(max);

  const getDataList = (value) => {
    setShowModal(!showModal);
    dispatch(setCurrentData(value));
  };

  console.log(showModal);

  return (
    <>
      <div className='elementlist'>
        <div className='elementlist-maplist'>
          {data?.length
            ? [...data]
                .slice(
                  (page - 1) * totalPage,
                  (page - 1) * totalPage + totalPage
                )
                .map((values) => (
                  <li
                    name='listData'
                    onClick={() => getDataList(values)}
                    key={values._id}
                    className='elementlist-list'
                  >
                    <div className='elementlist-list-each'>
                      <div
                        name='displaylastValue'
                        className='elementlist-list-each_value'
                        style={
                          values.value >= 0
                            ? { color: 'rgb(27, 214, 27)' }
                            : { color: 'rgb(252, 15, 15)' }
                        }
                      >
                        ${values.value}
                      </div>
                      <div className='elementlist-list-each_category'>
                        {values.category}
                      </div>
                      <div className='elementlist-list-each_date'>
                        {values?.date?.day}/{values?.date?.month}
                      </div>
                    </div>
                  </li>
                ))
            : null}
          {showModal ? <Modal /> : null}
        </div>
        <Pagination page={page} setPage={setPage} max={newMax} />
      </div>
    </>
  );
};

export default ListHistory;
