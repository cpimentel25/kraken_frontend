// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
// import './style.scss';

import { useState } from "react";
import ReactPaginate from "react-paginate";

// const Pagination = ({ page, setPage, max }) => {
//   const nextPage = () => {
//     if (page >= max) {
//       return null;
//     }
//     setPage(page + 1);
//   };

//   const previusPage = () => {
//     if (page <= 1) {
//       return null;
//     }
//     setPage(page - 1);
//   };

//   return (
//     <div className='pagination'>
//       <button className='pagination-button_left' onClick={previusPage}>
//         <FontAwesomeIcon icon={faAnglesLeft} />
//       </button>
//       <h3>
//         {page} <span>of</span> {max}
//       </h3>
//       <button className='pagination-button_right' onClick={nextPage}>
//         <FontAwesomeIcon icon={faAnglesRight} />
//       </button>
//     </div>
//   );
// };

// export default Pagination;

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((item) => (
          <div>
            <h3>Item #{item}</h3>
          </div>
        ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
