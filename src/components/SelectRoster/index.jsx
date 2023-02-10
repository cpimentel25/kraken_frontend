import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentRoster } from '../../features/api/callSlice';

import './styles.scss';

const SelectRoster = () => {
  const roster = useSelector((state) => state?.financeData?.roster);
  const currentRoster = useSelector((state) => state.financeData?.currentRoster?.roster)

  const [selectRoster, setSelectRoster] = useState(currentRoster);

  const select = useRef(null);
  const dispatch = useDispatch();

  const newRoster = roster?.filter((data) => data._id === selectRoster);

  const titleRoster = newRoster[0]?.title;
  const idRoster = newRoster[0]?._id;
  const createByRoster = newRoster[0]?.createdBy?._id;
  const createdAtRoster = newRoster[0]?.createdAt;
  const rosterGuets = newRoster[0]?.guests;

  const handleSelect = () => {
    setSelectRoster(select.current.value);
  };
  // console.log('title:', titleRoster, 'roster:', idRoster, 'create by:', createByRoster);

  useEffect(() => {
    if(selectRoster?.length) {
    // if(selectRoster !== null || selectRoster !== undefined) {
      dispatch(setCurrentRoster({
        title: titleRoster,
        roster: idRoster,
        createdBy: createByRoster,
        createdAt: createdAtRoster,
        guests: rosterGuets,
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectRoster])

  // const handleClic = (event) => {
  //   event.preventDefault();

  //   dispatch(fetchValue(idRoster));
  //   dispatch(fetchTotal(idRoster));
  // };

  return (
    <main className='selectroster'>
      <form className='selectroster-body'>
        <h3>Select Roster: </h3>
        <section className='selectroster-body-select'>
          <select
            ref={select}
            id='select-option'
            className='selectroster-body-select-option'
            onChange={handleSelect}
          >
            <option value='none' selected disabled hidden>
              Select an Roster
            </option>
            {roster?.map((data) => (
              <option
                key={data.title}
                title={data.title}
                id={data._id}
                value={data._id}
              >
                {data.title}
              </option>
            ))}
          </select>
          {/* {roster?.length <= 0
            ? <button className='selectroster-body-select_button' type='button'>Create Roster</button>
            : <button
              className='selectroster-body-select_button'
              type='submit'
              onClick={handleClic}
            >
              Select Roster
            </button>
          } */}
        </section>
      </form>
    </main>
  );
};

export default SelectRoster;
