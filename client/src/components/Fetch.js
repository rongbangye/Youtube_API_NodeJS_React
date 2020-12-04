import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Videos from './Videos';
import Pagination from './Pagination';
import Search from './Search';

const Fetch = () => {
  // Get the user input for maxResults
  const videosRef = useRef(30);
  // set videos with the data that get results from the servers
  const [videos, setVideos] = useState([]);
  // set loading status and display loading before successfully load data from the server
  const [loading, setLoading] = useState(false);
  // set currentPage default to 1
  const [currentPage, setcurrentPage] = useState(1);
  // default to show videos is 12
  const [videosPerPage, setVideosPerPage] = useState(12);
  // Get the searchTerm from user when they enter a word or phrase from the search bar
  const [searchTerm, setSearchTerm] = useState('');
  // Get the maxResults
  const [maxResults, setMaxResults] = useState(100);

  // Fetch from youtube API when this component load
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      console.log(typeof maxResults);
      const res = await axios.get(`http://localhost:3001/`, {
        maxResults: 'maxResults',
      });

      // console.log(res.data);
      setVideos(res.data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  // Current Videos
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo);

  // change current page number base which page user click
  const paginate = (pageNumber) => setcurrentPage(pageNumber);

  // if user type something and click search, display all the videos
  const searchVideo = (searchTerm) => {
    if (searchTerm.length >= 1) {
      setVideosPerPage(videos.length);
    }
    setSearchTerm(searchTerm);
  };

  // Handle and call the server when user enter a number that they want to display on the page "maxResults"
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(videosRef.current.value);
    const results = videosRef.current.value;
    console.log(results);
    const updateVideos = async (results) => {
      const res = await axios.put(`http://localhost:3001/`, {
        results: 'hi',
      });
      console.log(res.data);
    };
    updateVideos();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' ref={videosRef} />
        <input type='submit' />
      </form>

      <Search searchVideo={searchVideo} />

      <Videos
        videos={currentVideos}
        loading={loading}
        searchTerm={searchTerm}
      />
      <Pagination
        videosPerPage={videosPerPage}
        totalVideos={videos.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Fetch;
