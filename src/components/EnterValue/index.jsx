import { fetchValue, postValue } from '../../features/api/callSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import './style.scss';

const EnterValue = () => {
  const dispatch = useDispatch();

  const listOptions = useSelector((state) => state.financeData?.categorie);

  const rosterId = useSelector((state) => state.financeData?.currentRoster?.roster)
  const userId = useSelector((state) => state.financeData?.user?.profile?.id);
  const sendData = useSelector((state) => state.financeData?.sendData);

  const source = { createdBy: userId, roster: rosterId };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const dataToSend = Object.assign(data, source);

    dispatch(postValue(dataToSend));

    event.target.reset();
  };

  useEffect(() => {
    if (rosterId?.length) {
      dispatch(fetchValue(rosterId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendData]);

  return (
    <main className='entervalue'>
      <form className='entervalue-form' onSubmit={handleSubmit}>
        <section className='entervalue-input'>
          <div className='entervalue-input-newValue'>
            <p className='entervalue-info_text'>Enter new value:</p>
            <input
              name='value'
              className='entervalue-input-newValue_newvalue'
              id='value'
              type='text'
              // value={newvalue.value}
              placeholder='Enter value'
              required
            ></input>
          </div>
          <div className='entervalue-input-categorie'>
            <p className='entervalue-info_text'>Select categorie:</p>
            <select
              name='categorie'
              className='entervalue-input-categorie_options'
              id='categorie'
              // value={newvalue.categorie}
            >
              {listOptions?.map((categorie) => (
                <option
                  className='entervalue-input-categorie_options_selection'
                  key={categorie.name}
                >
                  {categorie.name}
                </option>
              ))}
            </select>
          </div>
          <div className='entervalue-input-description'>
            <p className='entervalue-info_text'>Enter any description:</p>
            <input
              name='description'
              id='description'
              type='text'
              className='entervalue-input-description_input'
              placeholder='Description'
            ></input>
          </div>
        </section>
        <div className='entervalue-button'>
          <button
            className='entervalue-button_send'
            type='submit'
          >
            SEND
          </button>
        </div>
      </form>
    </main>
  );
};

export default EnterValue;
