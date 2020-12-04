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
        {pageNumbers.map((page) => (
          <li className='page-item'>
            <a onClick={() => paginate(page)} href='!#' className='page-link'>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
