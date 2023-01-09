import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { pathUpdateUser, postCategorie } from '../../features/api/callSlice';

import './styles.scss';

const FormStart = () => {
  const user = useSelector((state) => state.financeData.user);
  const id = user?.profile?.id;
  const activeUser = { isActive: true };

  const [formStart, setFormStart] = useState([
    { name: 'Home', createdBy: id  },
    { name: 'Job', createdBy: id  },
    { name: 'Other', createdBy: id  },
  ]);

  const [goals, setGoals] = useState([
    { name: 'free', percentage: 10  },
    { name: 'Save', percentage: 30  },
    { name: 'Other', percentage: 20  },
    { name: 'Costs', percentage: 50  },
  ]);

  const dispatch = useDispatch();

  const handleChangeField = (index, event) => {
    const data = [...formStart];
    data[index][event.target.name] = event.target.value;
    setFormStart(data);
  };

  const handleChangeGoal = (index, event) => {
    const data = [...goals];
    data[index][event.target.name] = event.target.value;
    setGoals(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('ObSubmit: ', formStart);
    dispatch(postCategorie(formStart));
    dispatch(pathUpdateUser(activeUser));
  };

  const addInput = () => {
    const newInput = { name: '', createdBy: id };
    setFormStart([...formStart, newInput]);
  };

  const addGoal = () => {
    const newGoal = { name: '', percentage: 0 };
    setGoals([...goals, newGoal]);
  };

  const removeInput = (index) => {
    const data = [...formStart];
    data.splice(index, 1);
    setFormStart(data);
  };

  const removeGoal = (index) => {
    const data = [...goals];
    data.splice(index, 1);
    setGoals(data);
  };

  return (
    <div className='start'>
      <form className='formstart' onSubmit={handleSubmit}>
        <div className='formstart-options'>
          <h4 className='formstart-options_title'>Set Categorie:</h4>
          {formStart?.map((input, index) => {
            return (
              <div className='formstart-group' key={index}>
                <input
                  className='formstart-group_input'
                  type='text'
                  name='name'
                  placeholder='categorie'
                  value={input.name}
                  onChange={event => handleChangeField(index, event)}
                />
                {index ? (
                  <button
                    className='formstart-group-button_remove'
                    type='button'
                    onClick={() => removeInput(index)}
                  >
                    <FontAwesomeIcon className='icon-trash' icon={faTrashCan} />
                  </button>
                ) : null}
              </div>
            );
          })}
          {formStart.length < 7 ? (
            <button
              className='formstart-button_add'
              type='button'
              onClick={addInput}
            >
              Add field
            </button>
          ) : (
            <button className='formstart-button_addOff' type='button'>
              Max fields
            </button>
          )}
        </div>
        <div className='formstart-goals'>
          <h4 className='formstart-goals_title'>Set Goals:</h4>
          {goals?.map((input, index) => {
            return (
              <div className='formstart-goals-form' key={index}>
                <input
                  className='formstart-goals-form_input_name'
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={input.name}
                  onChange={event => handleChangeGoal(index, event)}
                />
                <input
                  className='formstart-goals-form_input_percentage'
                  type='number'
                  name='percentage'
                  placeholder='%'
                  value={input.percentage}
                  onChange={event => handleChangeGoal(index, event)}
                />
                {index ? (
                  <button
                    className='formstart-goals-button_remove'
                    type='button'
                    onClick={() => removeGoal(index)}
                  >
                    <FontAwesomeIcon className='icon-trash' icon={faTrashCan} />
                  </button>
                ) : null}
              </div>
            )
          })}
          {goals.length < 5 ? (
            <button
              className='formstart-button_add'
              type='button'
              onClick={addGoal}
            >
              Add Goal
            </button>
          ) : (
            <button className='formstart-button_addOff' type='button'>
              Max Goals
            </button>
          )}
        </div>
        <div className='formstart-button'>
          <button
            className='formstart-button_submit'
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormStart;
