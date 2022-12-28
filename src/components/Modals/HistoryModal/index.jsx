import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteOneValue } from '../../../features/api/callSlice';
import './style.scss';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const data = useSelector((state) => state.financeData.currentSelect);
  const dispatch = useDispatch();

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteOneValue(data?.id));
  };

  console.log(data);

  return (
    <div className='modal'>
      <div className='modal-display'>
        <div className='modal-display_buttons'>
          <button
            onClick={() => {
              handleDelete();
              handleCloseModal();
            }}
            className='modal-display_buttons-delete'
          >
            delete
          </button>
        </div>
        <div className='modal-display_info'>
          <div name='id' className='modal-display_info-id'>
            <h3>Id:</h3>
            <p className='data-id'>{data?.id}</p>
          </div>
          <div name='value' className='modal-display_info-value'>
            <h3>Value:</h3>
            <h3
              className='data-value'
              style={
                data?.value >= 0
                  ? { color: 'rgb(27, 214, 27)' }
                  : { color: 'rgb(252, 15, 15)' }
              }
            >
              ${data?.value}
            </h3>
          </div>
          <div name='category' className='modal-display_info-category'>
            <h3>Category:</h3>
            <p className='data-category'>{data?.category}</p>
          </div>
        </div>
        <div className='modal-display_date'>
          <div className='modal-display_date-day'>
            <h3>day</h3>
            <p>{data?.date?.day}</p>
          </div>
          <div className='modal-display_date-month'>
            <h3>month</h3>
            <p>{data?.date?.month}</p>
          </div>
          <div className='modal-display_date-year'>
            <h3>year</h3>
            <p>{data?.date?.year}</p>
          </div>
        </div>
        <div className='modal-display_time'>
          <div className='modal-display_time-hour'>
            <h3>Hour of input</h3>
            <p>
              {data?.date?.time.hour} : {data?.date?.time.minute}
            </p>
          </div>
        </div>
        <div className='modal-display_buttons'>
          <button className='modal-display_buttons-update'>edit</button>
          <button
            onClick={handleCloseModal}
            className='modal-display_buttons-close'
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
