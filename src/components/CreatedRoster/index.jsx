import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchRoster, postRoster } from '../../features/api/callSlice';
import PaginatedCreatedRoster from '../Pagination/CreatedRoster';

import './styles.scss';

const RosterSetting = () => {
  const roster = useSelector((state) => state.financeData?.settingRoster);
  const user = useSelector((state) => state.financeData?.user);
  const id = user?.profile?.id;

  const [newRoster, setNewRoster] = useState({ title: '', createdBy: id });

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
      <PaginatedCreatedRoster itemsPerPage={3} />
      <section className='roster-setting'>
        <p>Created a new Roster:</p>
        <form className='roster-setting-create' onSubmit={handleSubmit}>
          <input
            id='title'
            type='text'
            minLength={3}
            maxLength={30}
            className='roster-setting-create_input'
            placeholder='Enter name of new roster'
            onChange={handleChange}
            required
          />
          <button className='roster-setting-create_button' type='submit'>
            New roster
          </button>
        </form>
      </section>
      <section className='roster-inforsoter'>
        <div className='roster-inforsoter_title'>
          <p>{roster?.title}</p>
        </div>
        <div className='roster-inforsoter_userinfo'>
          <p>
            {roster?.createdBy?.firstName} {roster?.createdBy?.lastName}
          </p>
          <p>{roster?.createdBy?.email}</p>
          <p>
            Creat at:{' '}
            {new Date(roster?.createdAt)
              .toString()
              .split(' ')
              .splice(0, 4)
              .join(' ')}
          </p>
        </div>
      </section>
    </main>
  );
};

export default RosterSetting;
