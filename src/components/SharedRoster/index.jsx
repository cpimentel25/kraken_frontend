import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import PaginatedCreatedRoster from '../Pagination/CreatedRoster';
import { updateRosterByGuest } from '../../features/api/counterApi';
import { fetchRoster } from '../../features/api/callSlice';

import './styless.scss';

const SharedRoster = () => {
  const roster = useSelector((state) => state.financeData?.settingRoster);
  const guests = roster?.guests;

  const dispatch = useDispatch();

  const idRoster = roster?._id;

  const [form, setForm] = useState({
    email: '',
    roster: {
      idRoster: roster?._id,
      titleRoster: roster?.title,
    },
  });

  useEffect(() => {
    setForm({
      // email: '',
      roster: {
        idRoster: roster?._id,
        titleRoster: roster?.title,
      },
    });
  }, [roster]);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
    event.target.reset();
  };

  const sendData = async() => {
    await dispatch(updateRosterByGuest(form, idRoster));
    await dispatch(fetchRoster());
  };

  return (
    <main className='sharedroster'>
      <PaginatedCreatedRoster itemsPerPage={3} />
      <section className='sharedroster-guests'>
        <p>Enter a email guests:</p>
        <form className='sharedroster-guests-form' onSubmit={handleSubmit}>
          <input
            id='email'
            type='email'
            onChange={handleChange}
            className='sharedroster-guests-form_input'
            placeholder='Enter a email for guest'
            required
          />
          <button type='submit' className='sharedroster-guests-form_btn'>
            Send
          </button>
        </form>
      </section>
      <div className='sharedroster-important'>
        <p className='sharedroster-important_info'>
          Important: By removing a guest from your roster, this guest will not
          be able to view the "Roster" on their system, they will not be able to
          modify or create values. When deleting it, the data you have
          previously entered will not be lost.
        </p>
        <p></p>
      </div>
      <section className='sharedroster-guestsinfo'>
        <div>
          <p>List by Guests:</p>
        </div>
        {guests?.map((data) => (
          <section className='sharedroster-guestsinfo-user' key={data._id}>
            <div>
              <p>{data}</p>
            </div>
            <div>
              <button className='sharedroster-guestsinfo-user_btn'>
                Delete
              </button>
            </div>
          </section>
        ))}
      </section>
    </main>
  );
};

export default SharedRoster;
