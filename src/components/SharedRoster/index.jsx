import { useSelector } from 'react-redux';

import './styless.scss';

const SharedRoster = () => {
  const roster = useSelector((state) => state.financeData?.settingRoster);
  const guests = roster?.guests;

  return (
    <main className='sharedroster'>
      <section className='sharedroster-guests'>
        <p>Enter a email guests:</p>
        <form className='sharedroster-guests-form'>
          <input
            className='sharedroster-guests-form_input'
            placeholder='Enter a email for guest'
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
              <p>
                {data?.firstName} {data?.lastName}
              </p>
              <p>{data?.email}</p>
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
