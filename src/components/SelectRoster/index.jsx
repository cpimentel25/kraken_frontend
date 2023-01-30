import { useSelector } from 'react-redux';

import './styles.scss';

const SelectRoster = () => {
  const roster = useSelector((state) => state.financeData?.roster);

  return (
    <main className='selectroster'>
      <form className='selectroster-body'>
        <h3>Select Roster: </h3>
        <section className='selectroster-body-select'>
          <select className='selectroster-body-select-option'>
            {roster?.map((data) => (
              <option
                className='selectroster-body-select-option_list'
                key={data.title}
              >
                {data.title}
              </option>
            ))}
          </select>
          {roster?.length <= 0
            ? <button className='selectroster-body-select_button' type='button'>Create Roster</button>
            : <button className='selectroster-body-select_button' type='submit'>Select Roster</button>
          }
        </section>
      </form>
    </main>
  );
};

export default SelectRoster;
