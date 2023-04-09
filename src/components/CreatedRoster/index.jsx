import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { fetchRoster, postRoster } from '../../features/api/callSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const RosterSetting = () => {
  const user = useSelector((state) => state.financeData?.user);
  const id = user?.profile?.id;

  const [showSub, setShowSub] = useState(false);
  console.log('🚀 ~ file: index.jsx:19 ~ RosterSetting ~ showSub:', showSub);

  const show = (index) => {
    console.log('🚀 ~ file: index.jsx:22 ~ show ~ index:', index);
    if (showSub !== index) {
      return setShowSub(index);
    }
    return setShowSub(false);
  };

  // const roster = useSelector((state) => state.financeData?.settingRoster);

  const [newRoster, setNewRoster] = useState({
    title: '',
    createdBy: id,
    categories: [
      { category: 'Income', subcategory: ['Work', 'Other', 'Freelance'] },
      {
        category: 'Home',
        subcategory: [
          'Shopping',
          'Market',
          'Healt',
          'Unexpected',
          'Rent',
          'Services',
        ],
      },
      { category: 'Taxes', subcategory: ['State', 'Annual'] },
      {
        category: 'Business',
        subcategory: ['Income', 'investment', 'Bills', 'Unexpected'],
      },
      { category: 'Other', subcategory: ['Income', 'Bills'] },
    ],
  });

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setNewRoster({ ...newRoster, [id]: value });
  };

  const handleCategory = (index, event) => {
    const data = [...newRoster.categories];
    data[index].category = event.target.value;
    setNewRoster({ ...newRoster, categories: data });
  };

  const handleSubCategory = (index, event, showSub) => {
    const data = [...newRoster.categories];
    data[showSub].subcategory[index] = event.target.value;
    setNewRoster({ ...newRoster, categories: data });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendData();
    event.target.reset();
  };

  const addInput = () => {
    if (newRoster?.categories?.length < 7) {
      const data = { ...newRoster };
      data.categories.push({ category: '', subcategory: [''] });
      return setNewRoster(data);
    }
    return null;
  };

  const addSubCategory = (index, event, showSub) => {
    if (newRoster?.categories[showSub]?.subcategory?.length < 7) {
      const data = { ...newRoster };
      data.categories[showSub].subcategory.push('');
      return setNewRoster(data);
    }
    console.log('max subCategory');
    return null;
  };

  const removeInput = (index) => {
    const data = { ...newRoster };
    data.categories.splice(index, 1);
    setNewRoster(data);
  };

  const removeSubCategory = (index, showSub) => {
    const data = { ...newRoster };
    data.categories[showSub].subcategory.splice(index, 1);
    setNewRoster(data);
  };

  const sendData = async () => {
    await dispatch(postRoster(newRoster));
    await dispatch(fetchRoster());
  };

  console.log('new roster: ', newRoster);

  return (
    <main className='roster'>
      <section className='roster-setting'>
        {/* <div className='roster-setting-info'>
          <div className='roster-setting-info_text'>
            <p className='roster-setting-info_text-one'>
              If you are looking to create a roster, you can do it in two ways:
            </p>
            <p className='roster-setting-info_text-two'>
              1. Just inserting the name of the roster you want and then click
              on "New Roster"
            </p>
            <p className='roster-setting-info_text-three'>
              2. Insert the name you want and customize the roster categories, a
              minimum of 1 and a maximum of 7, then click on "New Roster"
            </p>
          </div>
        </div> */}
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
                <div
                  className='roster-setting-categories_group'
                  key={index}
                  style={
                    showSub === false
                      ? null
                      : showSub === index
                      ? {
                          backgroundColor: 'rgb(31, 31, 31)',
                          borderRadius: '5px',
                          borderColor: 'red',
                        }
                      : { filter: 'blur(4px)' }
                  }
                >
                  <div className='roster-setting-categories_group-withbutton'>
                    {index === 0 && (
                      <button
                        className='roster-setting-categories_group_btnAdd'
                        type='button'
                        onClick={addInput}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    )}
                    {index ? (
                      <button
                        className='roster-setting-categories_group_btnRemove'
                        type='button'
                        onClick={() => removeInput(index)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    ) : null}
                    <input
                      className='roster-setting-categories_group_input'
                      id={input.category}
                      type='text'
                      required
                      value={input.category}
                      name={input.category}
                      onChange={(event) => handleCategory(index, event)}
                    />
                    <button
                      className='roster-setting-categories_group_btnShow'
                      type='button'
                      onClick={() => show(index)}
                    >
                      {showSub === index ? (
                        <FontAwesomeIcon icon={faChevronUp} />
                      ) : (
                        <FontAwesomeIcon icon={faChevronDown} />
                      )}
                    </button>
                  </div>
                  {showSub === index ? (
                    <div className='roster-setting-categories_group-subcategories'>
                      {input?.subcategory?.map((data, index) => {
                        return (
                          <div
                            className='roster-setting-categories_group-subcategories_subgroup'
                            key={index}
                          >
                            {index ? (
                              <button
                                className='roster-setting-categories_group_btnRemove'
                                type='button'
                                onClick={() =>
                                  removeSubCategory(index, showSub)
                                }
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                            ) : null}
                            <input
                              className='roster-setting-categories_group-subcategories_subgroup_input'
                              id={data}
                              type='text'
                              required
                              value={data}
                              name={data}
                              onChange={(event) =>
                                handleSubCategory(index, event, showSub)
                              }
                            />
                            {index === 0 ? (
                              <button
                                className='roster-setting-categories_group_btnAdd'
                                type='button'
                                onClick={(event) =>
                                  addSubCategory(index, event, showSub)
                                }
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
            {/* {newRoster?.categories?.map((data, index) => {
              return (
                <div key={index}>
                  <input
                    id='subcategory'
                    type='text'
                    required
                    value={data.subcategory}
                    name={data.subcategory}
                  />
                </div>
              );
            })} */}
            {/* {newRoster?.categories?.length < 7 ? (
              <button
                className='roster-setting-categories_btnAdd'
                type='button'
                onClick={addInput}
              >
                Add Field
              </button>
            ) : null} */}
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
