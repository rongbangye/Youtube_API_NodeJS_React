import React, { useState } from 'react';
import '../styles/videosList.css';
import '../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';

export default function Videos({ videos, loading, searchTerm }) {
  const [isOpen, setOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState('');

  // Loading the page
  if (loading) {
    return <h2>Loading...</h2>;
  }
  // sometime Youtube API send back an empty array, ask the user to refresh the page
  if (videos.length <= 0) {
    return <h2>Plesse reload the page...</h2>;
  }

  return (
    <div className='videos'>
      {videos
        .filter((video) => {
          // use Regular Express for case insenstive
          const regExp = new RegExp(searchTerm, 'gi');
          if (video.snippet.title.match(regExp)) {
            return video;
          }
        })
        .map((video) => (
          <div>
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
  );
}
