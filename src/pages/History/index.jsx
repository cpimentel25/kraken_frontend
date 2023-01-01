import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';
import DisplayTotalHistory from '../../components/DisplayTotalHistory';
import FilterModal from '../../components/Modals/FiltersModal';

import './style.scss';

const History = () => {
  const [positive, setPositive] = useState(true);
  const [negative, setNegative] = useState(true);

  const [page, setPage] = useState(1);
  const totalPage = 10;

  const filterCategory = useSelector((state) => state.financeData.categoryFilter);
  // console.log("filters: ", filterCategory);

  const data = useSelector((state) => state.financeData.data);
  const [newData, setNewData] = useState(data);

  const conditionalValue = () => {
    if (positive === true && negative === false) {
      return setNewData(data.filter((values) => values.value > 0));
    } else if (positive === false && negative === true) {
      return setNewData(data.filter((values) => values.value < 0));
    }
    return setNewData(data);
  };

  const handlePositive = () => {
    setPositive(!positive);
    setNegative(false);
  };

  const handleNegative = () => {
    setNegative(!negative);
    setPositive(false);
  };

  const newDataFilter = (value) => {
    if (filterCategory !== null) {
      // return filterCategory.includes(value.category);
      setNewData(data.filter((value) => filterCategory.includes(value.category)));
    }
    return newData;
  };

  useEffect(
    () => {
      conditionalValue();
      newDataFilter();
    },
    // eslint-disable-next-line
    [positive, negative, data, filterCategory]
  );

  const max = data.length / totalPage;
  const newMax = Math.ceil(max);

  return (
    <div className='main'>
      <DisplayTotalHistory data={newData} />
      <div className='history'>
        <div className='history-maplist'>
          {newData.length
            ? [...newData]
                // .filter(newDataFilter)
                // .filter((value) => filterCategory.includes(value.category))
                .reverse()
                .slice(
                  (page - 1) * totalPage,
                  (page - 1) * totalPage + totalPage
                )
                .map((values) => (
                  <li name='listData' key={values._id} className='history-list'>
                    <div className='history-list-each'>
                      <div
                        name='displaylastValue'
                        className='history-list-each_value'
                        style={
                          values.value >= 0
                            ? { color: 'rgb(27, 214, 27)' }
                            : { color: 'rgb(252, 15, 15)' }
                        }
                      >
                        ${values.value}
                      </div>
                      <div className='history-list-each_category'>
                        {values.category}
                      </div>
                      <div className='history-list-each_date'>
                        {values?.date?.day}/{values?.date?.month}
                      </div>
                    </div>
                  </li>
                ))
            : null}
        </div>
        <Pagination page={page} setPage={setPage} max={newMax} />
      </div>
      <div className='filters-btn'>
        <div className='filters-button'>
          <button
            className='filters-button_select'
            onClick={handlePositive}
            style={
              positive === true && negative === false
                ? { backgroundColor: 'rgb(27, 214, 27)' }
                : null
            }
          >
            Positive
          </button>
          <button
            className='filters-button_select'
            onClick={handleNegative}
            style={
              positive === false && negative === true
                ? { backgroundColor: 'rgb(27, 214, 27)' }
                : null
            }
          >
            Negative
          </button>
        </div>
      </div>
      <FilterModal />
    </div>
  );
};

export default History;
