import { useSelector } from 'react-redux';
import { useState } from 'react';

import './styles.scss';

const FilterBar = (prop) => {
  const roster = useSelector((state) => state.financeData?.roster);
  // const lastDate = useSelector(
  //   (state) => state.financeData?.lastValue?.createdAt
  // );
  const categorie = useSelector((state) => state.financeData?.categorie);
  const categorieName = categorie?.map((name) => name.name);

  const today = new Date().getTime();

  const [filter, setFilter] = useState({
    roster: '',
    categorie: categorieName,
    rangeValue: {
      min: 0,
      max: 99999999,
    },
    createdBy: '',
    createdAt: today,
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setFilter({
      ...filter,
      [id]: value,
    });
  };

  const filterRoster = roster?.filter(
    (select) => select._id === filter?.roster
  );

  const userCreatedRoster = filterRoster[0]?.createdBy;
  const allGuestsRoster = filterRoster[0]?.guests?.map((guest) => guest);

  const valuesCreated = allGuestsRoster?.concat(userCreatedRoster);
  const allValuesCreated = valuesCreated?.map((all) => all._id);

  const handleChangeCategorie = ({ target }) => {
    const { id, value } = target;
    setFilter({
      ...filter,
      [id]: value.toString().split(','),
    });
  };

  const handleChangeCreated = ({ target }) => {
    const { id, value } = target;
    setFilter({
      ...filter,
      [id]: value.toString().split(','),
    });
  };

  const handleChangeValues = ({ target }) => {
    const { id, value } = target;
    setFilter({
      ...filter,
      rangeValue: {
        ...filter.rangeValue,
        [id]: +value,
      },
    });
  };

  // console.log('Set filter: ', filter);

  const handleSubmit = (event) => {
    event.preventDefault();
    prop.sendFilter(filter);
  };

  return (
    <form className='filterbar' onSubmit={handleSubmit}>
      <section className='filterbar-roster'>
        <div className='filterbar-roster_title'>
          <p>Roster</p>
          <select id='roster' onChange={handleChange}>
            <option id='categorie' selected>
              Select Roster
            </option>
            {roster?.map((data) => (
              <option
                className='filterbar-roster_title_select'
                id='roster'
                value={data?._id}
              >
                {data?.title}
              </option>
            ))}
          </select>
        </div>
      </section>
      {/* <section className='filterbar-date'>
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
      </section> */}
      <section>
        <div>
          <p>Values created:</p>
          <select id='createdBy' onChange={handleChangeCreated}>
            <option id='categorie' selected>
              Select user
            </option>
            <option id='categorie' value={allValuesCreated}>
              All users
            </option>
            {valuesCreated?.map((data) => (
              <option id='createdBy' value={data?._id}>
                {data?.firstName} {data?.lastName}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className='filterbar-categorie'>
        <select
          id='categorie'
          className='filterbar-categorie_select'
          onChange={handleChangeCategorie}
        >
          <option id='categorie' value={categorieName} selected>
            All Categories
          </option>
          {categorie?.map((data) => (
            <option
              id='categorie'
              key={data._id}
              name={data.name}
              value={data.name}
            >
              {data.name}
            </option>
          ))}
        </select>
      </section>
      <section className='filterbar-input'>
        <div className='filterbar-input_min'>
          <input
            className='filterbar-input_min-input'
            id='min'
            type='number'
            placeholder='min'
            onChange={handleChangeValues}
          />
        </div>
        <div className='filterbar-input_max'>
          <input
            className='filterbar-input_max-input'
            id='max'
            type='number'
            placeholder='max'
            onChange={handleChangeValues}
          />
        </div>
      </section>
      <section className='filterbar-submit'>
        <button className='filterbar-submit_btn' type='submit'>
          Search
        </button>
      </section>
    </form>
  );
};

export default FilterBar;
