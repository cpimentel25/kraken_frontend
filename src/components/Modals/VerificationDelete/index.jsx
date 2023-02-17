import { useDispatch, useSelector } from 'react-redux';
import { deleteRoster } from '../../../features/api/counterApi';
import { fetchRoster } from '../../../features/api/callSlice';

import './styless.scss';

const ConfirmDeleteRoster = ({ setShowModal }) => {
  const roster = useSelector((state) => state?.financeData?.settingRoster);

  const dispatch = useDispatch();

  const handleDelete = async() => {
    setShowModal(false)
    await dispatch(deleteRoster(roster?._id));
    await dispatch(fetchRoster());
  };

  return (
    <main className='modalConfirmDelete'>
      <section className='modalConfirmDelete-modal'>
        <div className='modalConfirmDelete-modal-content'>
          <p className='modalConfirmDelete-modal-content_importan'>
            Important: If you delete the roster, all its data will be
            permanently deleted and cannot be recovered, the guest(s) on the
            roster will no longer have access or data from the deleted roster.
          </p>
          <p className='modalConfirmDelete-modal-content_infoRoster'>
            Confirm delete {roster.title}?
          </p>
          <div className='modalConfirmDelete-modal-content_btn'>
            <button
              className='modalConfirmDelete-modal-content_btn_cancel'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className='modalConfirmDelete-modal-content_btn_confirm'
              onClick={handleDelete}
            >
              Confirm
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConfirmDeleteRoster;
