import { useSelector } from 'react-redux';
// import { useState } from 'react';
// import DatePickerclear from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import './styles.scss';

const FilterBar = () => {
  const roster = useSelector((state) => state.financeData?.currentRoster);
  const lastDate = useSelector((state) => state.financeData?.lastValue?.createdAt);
  const categorie = useSelector((state) => state.financeData?.categorie)

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(null);
  // const onChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  // console.log(startDate, endDate)

  return (
    <main className='filterbar'>
      <section className='filterbar-roster'>
        <div className='filterbar-roster_title'>
          <p>Roster</p>
          <p className='filterbar-roster_title_select'>{roster?.title}</p>
        </div>
      </section>
      <section className='filterbar-date'>
        <div className='filterbar-date_created'>
          <p>Created at</p>
          <p className='filterbar-date_created_info'>
            {new Date(roster?.createdAt)
              .toString()
              .split(' ')
              .splice(1, 3)
              .join(' ')}
          </p>
        </div>
        <div className='filterbar-date_created'>
          <p>last entry</p>
          <p className='filterbar-date_created_info'>
            {new Date(lastDate).toString().split(' ').splice(1, 3).join(' ')}
          </p>
        </div>
        {/* <DatePickerclear
          className='react-datepicker'
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        /> */}
      </section>
      <section className='filterbar-categorie'>
        <select className='filterbar-categorie_select'>
          <option value='none' selected disabled hidden>
            All Categories
          </option>
          {categorie?.map((data) => (
            <option key={data._id} name={data.name} value={data._id}>
              {data.name}
            </option>
          ))}
        </select>
      </section>
      <section className='filterbar-input'>
        <div className='filterbar-input_min'>
          <input
            className='filterbar-input_min-input'
            type='number'
            placeholder='min'
          />
        </div>
        <div className='filterbar-input_max'>
          <input
            className='filterbar-input_max-input'
            type='number'
            placeholder='max'
          />
        </div>
      </section>
      <section className='filterbar-submit'>
        <button className='filterbar-submit_btn' type='submit'>
          Search
        </button>
      </section>
    </main>
  );
};

export default FilterBar;
