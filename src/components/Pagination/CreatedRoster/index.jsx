import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setRosterSetting } from '../../../features/api/callSlice';
import {
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons';

import './styless.scss';

function Items({ currentItems }) {

  const dispatch = useDispatch();

  const handleClic = (data) => {
    dispatch(setRosterSetting(data));
  };

  return (
    <>
      {currentItems &&
        currentItems.map((data) => (
          <div key={data?._id} className='rostercreated' onClick={() => handleClic(data)}>
            <div className='rostercreated-title'>
              <p className='rostercreated-title_roster'>{data?.title}</p>
            </div>
            <div className='rostercreated-date'>
              <p>
                Creat at:{' '}
                {new Date(data.createdAt)
                  .toString()
                  .split(' ')
                  .splice(0, 4)
                  .join(' ')}
              </p>
            </div>
            <div className='rostercreated-guests'>
              <p>Guests: {data?.guests?.length}</p>
            </div>
          </div>
        ))}
    </>
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
    <main className='rosterpaginated' >
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
