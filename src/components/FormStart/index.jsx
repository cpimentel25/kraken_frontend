import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './styles.scss';

const FormStart = () => {
  const [formStart, setFormStart] = useState(['Home', 'Work', 'Other']);

  const handleChange = (index, event) => {
    const data = [...formStart];
    // data[index][event.target] = event.target.value;
    data[index] = event.target.value;
    setFormStart(data);
  };

  const addInput = () => {
    const newInput = '';
    setFormStart([...formStart, newInput]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('ObSubmit: ', formStart);
  };

  const removeInput = (index) => {
    const data = [...formStart];
    data.splice(index, 1);
    setFormStart(data);
  };

  // console.log('form start: ', formStart); // -> Working!

  return (
    <div className='start'>
      <form className='formstart' onSubmit={handleSubmit}>
        <div className='formstart-options'>
          {formStart?.map((input, index) => {
            return (
              <div className='formstart-group' key={index}>
                <input
                  className='formstart-group_input'
                  type='text'
                  name='categorie'
                  placeholder='categorie'
                  value={input}
                  onChange={(event) => handleChange(index, event)}
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
        </div>
        <div className='formstart-button'>
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
