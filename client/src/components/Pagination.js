import React from 'react';
import '../styles/pagination.css';

const Pagination = ({ videosPerPage, totalVideos, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalVideos / videosPerPage); i++) {
    pageNumbers.push(i);
  }
  // console.log(pageNumbers);
  return (
    <div className='pagination'>
      <ul className='page'>
        {pageNumbers.map((page, index) => (
          <li className='page-item' key={index}>
            <button onClick={() => paginate(page)} className='page-link'>
              {page}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
