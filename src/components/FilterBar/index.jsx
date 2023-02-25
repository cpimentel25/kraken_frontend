import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';

import './styles.scss';

const FilterBar = (prop) => {
  const roster = useSelector((state) => state.financeData?.roster);

  const initialCreate = roster[0]?.guests?.map((guest) => guest);
  const allCreatedValues = initialCreate?.concat(roster[0]?.createdBy);
  const resultCreate = allCreatedValues?.map((data) => data._id)

  const today = new Date().getTime();

  const [filter, setFilter] = useState({
    roster: roster[0]?._id,
    categorie: roster[0]?.categories,
    rangeValue: {
      min: 0,
      max: 99999999,
    },
    createdBy: resultCreate,
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
  const categoriesRoster = filterRoster[0]?.categories;

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

  useEffect(() => {
    prop.sendFilter(filter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    prop.sendFilter(filter);
  };

  return (
    <form className='filterbar' onSubmit={handleSubmit}>
      <section className='filterbar-roster'>
        <select
          className='filterbar-roster_select'
          id='roster'
          onChange={handleChange}
        >
          <option id='categorie' selected>
            Select Roster
          </option>
          {roster?.map((data) => (
            <option
              className='filterbar-roster_title_select-option'
              id='roster'
              value={data?._id}
            >
              {data?.title}
            </option>
          ))}
        </select>
      </section>
      <section className='filterbar-users'>
        <select className='filterbar-users_select' id='createdBy' onChange={handleChangeCreated}>
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
      </section>
      <section className='filterbar-categorie'>
        <select
          id='categorie'
          className='filterbar-categorie_select'
          onChange={handleChangeCategorie}
        >
          <option id='categorie' selected>
            Select Categories
          </option>
          <option id='categorie' value={categoriesRoster}>
            All Categories
          </option>
          {categoriesRoster?.map((data) => (
            <option
              id='categorie'
              key={data}
              name={data}
              value={data}
            >
              {data}
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
            placeholder='value min'
            onChange={handleChangeValues}
          />
        </div>
        <div className='filterbar-input_max'>
          <input
            className='filterbar-input_max-input'
            id='max'
            type='number'
            placeholder='value max'
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
