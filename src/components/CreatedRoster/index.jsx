import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchRoster, postRoster } from '../../features/api/callSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const RosterSetting = () => {
  const user = useSelector((state) => state.financeData?.user);
  const id = user?.profile?.id;

  // const roster = useSelector((state) => state.financeData?.settingRoster);

  const [newRoster, setNewRoster] = useState({
    title: '',
    createdBy: id,
    categories: [
      'Income',
      'Transport',
      'Taxes',
      'Shopping',
      'Unexpected',
      'Other',
    ],
  });

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setNewRoster({ ...newRoster, [id]: value });
  };

  const handleCategorie = (index, event) => {
    const data = [...newRoster.categories];
    data[index] = event.target.value;
    setNewRoster({ ...newRoster, categories: data });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
    event.target.reset();
  };

  const addInput = () => {
    const data = { ...newRoster };
    data.categories.push('');
    setNewRoster(data);
  };

  const removeInput = (index) => {
    const data = { ...newRoster };
    data.categories.splice(index, 1);
    setNewRoster(data);
  };

  const sendData = async() => {
    await dispatch(postRoster(newRoster));
    await dispatch(fetchRoster());
  };

  // console.log('new roster: ', newRoster);

  return (
    <main className='roster'>
      <section className='roster-setting'>
        <div className='roster-setting-info'>
          <div className='roster-setting-info_text'>
            <p className='roster-setting-info_text-one'>
              If you are looking to create a roster, you can do it in two ways:
            </p>
            <p className='roster-setting-info_text-two'>
              1. Just inserting the name of the roster you want and then click on
              "New Roster"
            </p>
            <p className='roster-setting-info_text-three'>
              2. Insert the name you want and customize the roster categories, a
              minimum of 1 and a maximum of 7, then click on "New Roster"
            </p>
          </div>
        </div>
        <p className='roster-setting_title'>Created a new Roster:</p>
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
          <div className='roster-setting-categories'>
            <p className='roster-setting-categories_title'>Set Categories:</p>
            {newRoster?.categories?.map((input, index) => {
              return (
                <div className='roster-setting-categories_group' key={index}>
                  <input
                    className='roster-setting-categories_group_input'
                    id='categories'
                    type='text'
                    required
                    value={input}
                    onChange={(event) => handleCategorie(index, event)}
                  />
                  {index ? (
                    <button
                      className='roster-setting-categories_group_btnRemove'
                      type='button'
                      onClick={() => removeInput(index)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  ) : null}
                </div>
              );
            })}
            {newRoster?.categories?.length < 7 ? (
              <button
                className='roster-setting-categories_btnAdd'
                type='button'
                onClick={addInput}
              >
                Add Field
              </button>
            ) : null}
          </div>
          <button className='roster-setting-create_button' type='submit'>
            New roster
          </button>
        </form>
      </section>
      {/* <section className='roster-inforsoter'>
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
      </section> */}
    </main>
  );
};

export default RosterSetting;
