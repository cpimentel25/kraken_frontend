import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentData } from '../../features/api/callSlice';
import Pagination from '../Pagination';
import Modal from '../Modals/HistoryModal';

import './style.scss';

const ListHistory = () => {
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const totalPage = 5;

  const dispatch = useDispatch();

  const data = useSelector((state) => state.financeData.data);
  // console.log(data);

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
                          {values.categorie}
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
