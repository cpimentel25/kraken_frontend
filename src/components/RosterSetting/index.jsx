import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchRoster, postRoster } from '../../features/api/callSlice';

import './styles.scss';

const RosterSetting = () => {
  const user = useSelector((state) => state.financeData?.user);
  const id = user?.profile?.id;
  const roster = useSelector((state) => state.financeData?.roster);

  const [newRoster, setNewRoster] = useState(
    { title: '', createdBy: id }
  );

  const dispatch = useDispatch();
  const sendData = () => {
    dispatch(postRoster(newRoster));
    dispatch(fetchRoster());
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setNewRoster({ ...newRoster, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
    event.target.reset();
  };

  return (
    <main className='roster'>
      <section className='roster-setting'>
        <div className='roster-setting-data'>
          {roster?.map((data) => {
            return (
              <div key={data._id} className='roster-setting-data_filds'>
                <div className='roster-setting-data_filds_title'>
                  <h3>Title: </h3><p>{data.title}</p>
                </div>
                <div className='roster-setting-data_filds_createdby'>
                  <h3>Created by:</h3><p>{data.createdBy.firstName} {data.createdBy.lastName}</p>
                </div>
                <div className='roster-setting-data_filds_date'>
                  <h3>Creat at:</h3>
                  <p>{new Date(data.createdAt)
                    .toString()
                    .split(' ')
                    .splice(0, 4)
                    .join(' ')}
                  </p>
                </div>
                <div className='roster-setting-data_filds_guests'>
                  <h3>Guests:</h3><p>{data.Guests.length}</p>
                </div>
              </div>
            );
          })}
        </div>
        <form className='roster-setting-create' onSubmit={handleSubmit}>
          <input
            id='title'
            type='text'
            className='roster-setting-create_input'
            placeholder='Enter name of new roster'
            onChange={handleChange}
          />
          <button
            className='roster-setting-create_button'
            type='submit'
          >
            New roster
          </button>
        </form>
      </section>
    </main>
  );
};

export default RosterSetting;
