import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setRosterSetting } from '../../../features/api/callSlice';
import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import ConfirmDeleteRoster from '../../Modals/VerificationDelete';

import './styless.scss';

function Items({ currentItems }) {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  const handleClic = (data) => {
    dispatch(setRosterSetting(data));
  };

  const handleAll = (data) => {
    dispatch(setRosterSetting(data));
    setShowModal(true);
  }

  return (
    <main>
      {showModal ? (
        <section className='rosterdelete'>
          <ConfirmDeleteRoster setShowModal={setShowModal} />
        </section>
      ) : null}
      {currentItems &&
        currentItems.map((data) => (
          <section className='rostercreated'>
            <div
              key={data?._id}
              className='rostercreated-info'
              onClick={() => handleClic(data)}
            >
              <div className='rostercreated-info-title'>
                <p className='rostercreated-info-title_roster'>{data?.title}</p>
              </div>
              <div className='rostercreated-info-date'>
                <p>
                  Creat at:{' '}
                  {new Date(data.createdAt)
                    .toString()
                    .split(' ')
                    .splice(0, 4)
                    .join(' ')}
                </p>
              </div>
              <div className='rostercreated-info-guests'>
                <p>Guests: {data?.guests?.length}</p>
              </div>
            </div>
            <div className='rostercreated-delete'>
              <button
                className='rostercreated-delete_btn'
                onClick={() => handleAll(data)}
              >
                Delete
              </button>
            </div>
          </section>
        ))}
    </main>
  );
}

function PaginatedCreatedRoster({ itemsPerPage }) {
  const roster = useSelector((state) => state.financeData?.roster);
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);

  const currentItems = roster?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(roster?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % roster?.length;
    // console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);

    setItemOffset(newOffset);
  };

  return (
    <main className='rosterpaginated'>
      <div className='rosterpaginated_items'>
        <Items currentItems={currentItems} />
      </div>
      <div className='rosterpaginated_paginated'>
        <ReactPaginate
          className='rosterpaginated_paginated-styles'
          breakLabel='...'
          nextLabel={
            <FontAwesomeIcon
              icon={faSquareCaretRight}
              className='rosterpaginated_paginated-icon'
            />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel={
            <FontAwesomeIcon
              icon={faSquareCaretLeft}
              className='rosterpaginated_paginated-icon'
            />
          }
          renderOnZeroPageCount={null}
        />
      </div>
    </main>
  );
}

export default PaginatedCreatedRoster;
