import React, { useState } from 'react';
import '../styles/searchBar.css';

const Search = ({ searchVideo }) => {
  const [searchTerm, setSearchTerm] = useState([]);

  const onKeyDownHandler = (event) => {
    // when user hit enter, do the videos match search
    if (event.code === 'Enter') {
      searchVideo(searchTerm);
    }
  };
  // console.log(searchTerm);
  return (
    <div className='searchBar'>
      <div className='search'>
        <input
          className='search_input'
          type='text'
          placeholder='Search...'
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          onKeyDown={(event) => onKeyDownHandler(event)}
        />
        <button
          onClick={() => searchVideo(searchTerm)}
          className='search-button'
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Search;
