import React from 'react';
import { navigate } from '@reach/router';
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
          <VideoCard
            key={video.id.videoId}
            video={video}
            isLoggedIn={isLoggedIn}
          />
        );
      })}
    </div>
  );
};

export default VideoGrid;
