import React, { useState, useRef } from 'react';
import '../styles/videosList.css';
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';

export default function Videos({ videos, loading, searchTerm }) {
  const [isOpen, setOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');
  const [videosRow, setVideosRow] = useState('30');
  const rowRef = useRef(30);

  // Loading the page
  if (loading) {
    return (
      <h2 style={{ textAlign: 'center', fontSize: '60px' }}>Loading...</h2>
    );
  }
  // sometime Youtube API send back an empty array, ask the user to refresh the page
  if (videos.length <= 0) {
    return <h2 style={{ textAlign: 'center' }}>Plesse reload the page...</h2>;
  }

  // user select how many vidoes that they want to show per row
  const handleOnchange = (e) => {
    setVideosRow(rowRef.current.value);
  };

  return (
    <div>
      <div className='vides_row'>
        <label>
          Pick your number of videos to show one row:
          <select ref={rowRef} onChange={handleOnchange}>
            <option value='30'>Default</option>
            <option value='40'>2 videos per row</option>
            <option value='30'>3 videos per row</option>
            <option value='20'>4 videos per row</option>
          </select>
        </label>
      </div>
      <div className='videos'>
        {videos
          .filter((video) => {
            // use Regular Express for case insenstive
            const regExp = new RegExp(searchTerm, 'gi');

            return video.snippet.title.match(regExp);
          })
          .map((video, index) => (
            <div
              key={video.id}
              id='video_main'
              style={{ flex: `1 1 ${videosRow}%`, height: '100%' }}
            >
              <div
                className='showVideo'
                onClick={() => {
                  setOpen(true);
                  setCurrentVideoId(video.snippet.resourceId.videoId);
                }}
              >
                <div className='video_card'>
                  <div className='video_thumbnail'>
                    <img
                      src={`${video.snippet.thumbnails.medium.url}`}
                      alt='thumbnails'
                    />
                  </div>
                  <div className='card_body'>
                    <h4 className='card_title'>{video.snippet.title}</h4>
                  </div>
                </div>
              </div>

              <ModalVideo
                channel='youtube'
                autoplay
                isOpen={isOpen}
                videoId={currentVideoId}
                onClose={() => setOpen(false)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
