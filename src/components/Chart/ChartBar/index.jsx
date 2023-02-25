import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './styless.scss';

const ChartBar = (prop) => {
  const roster = useSelector((state) => state.financeData?.roster);

  const initialCreate = roster[0]?.guests?.map((guest) => guest);
  const allCreatedValues = initialCreate?.concat(roster[0]?.createdBy);
  const resultCreate = allCreatedValues?.map((data) => data._id);

  const today = new Date().getTime();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setSelectRoster({
      ...selectRoster,
      [id]: value,
    });
  };

  const [selectRoster, setSelectRoster] = useState({
    roster: roster[0]?._id,
    categorie: roster[0]?.categories,
    rangeValue: {
      min: 0,
      max: 99999999,
    },
    createdBy: resultCreate,
    createdAt: today,
  });

  useEffect(() => {
    prop.chartSelect(selectRoster);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectRoster]);

  return (
    <main className='chartBar'>
      <section className='chartBar-section'>
        <p>Select Roster:</p>
        <select
          className='chartBar-section-select'
          id='roster'
          onChange={handleChange}
        >
          {roster?.map((data) => (
            <option
              className='chartBar-section-select_op'
              id='roster'
              value={data?._id}
            >
              {data?.title}
            </option>
          ))}
        </select>
      </section>
    </main>
  );
};

export default ChartBar;
