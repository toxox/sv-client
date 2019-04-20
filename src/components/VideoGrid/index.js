import React from 'react';
import VideoCardPlaceholder from '../VideoCard/VideoCardPlaceholder';
import VideoCard from '../VideoCard';
import './styles.scss';

const VideoGrid = ({ videos, isLoggedIn, isFetching }) => {
  if (isFetching) {
    return (
      <div id="video-grid">
        {[...Array(30)].map((_, i) => {
          return <VideoCardPlaceholder key={i} />;
        })}
      </div>
    );
  }
  return (
    <div id="video-grid">
      {videos.map(video => {
        return (
          <VideoCard video={video} isLoggedIn={isLoggedIn} onClick={() => {}} />
        );
      })}
    </div>
  );
};

export default VideoGrid;
