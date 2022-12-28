import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

const Pagination = ({ page, setPage, max }) => {
  const nextPage = () => {
    if (page >= max) {
      return null;
    }
    setPage(page + 1);
  };

  const previusPage = () => {
    if (page <= 1) {
      return null;
    }
    setPage(page - 1);
  };

  return (
    <div className='pagination'>
      <button className='pagination-button_left' onClick={previusPage}>
        <FontAwesomeIcon icon={faAnglesLeft} />
      </button>
      <h3>
        {page} <span>of</span> {max}
      </h3>
      <button className='pagination-button_right' onClick={nextPage}>
        <FontAwesomeIcon icon={faAnglesRight} />
      </button>
    </div>
  );
};

export default Pagination;
