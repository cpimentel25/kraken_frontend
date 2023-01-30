import { postValue } from '../../features/api/callSlice';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

const EnterValue = () => {
  const dispatch = useDispatch();

  const listOptions = useSelector((state) => state.financeData?.categorie);
  console.log(listOptions);

  const user = useSelector((state) => state.financeData?.user);
  const id = user?.profile?.id;

  const source = { createdBy: id };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const dataToSend = Object.assign(data, source);

    dispatch(postValue(dataToSend));
    event.target.reset();
  };

  return (
    <main className='entervalue'>
      <section className='entervalue-info'>
        <p className='entervalue-info_text'>Enter new value:</p>
      </section>
      <form className='entervalue-form' onSubmit={handleSubmit}>
        <div className='entervalue-input'>
          <div className='entervalue-input-newValue'>
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
        </div>
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
