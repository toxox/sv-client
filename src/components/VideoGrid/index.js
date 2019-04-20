import React from 'react';
import PropTypes from 'prop-types';
import VideoCardPlaceholder from './VideoCard/VideoCardPlaceholder';
import VideoCard from './VideoCard';
import './styles.scss';

const VideoGrid = ({ videos, isLoggedIn, isFetching }) => {
  if (isFetching) {
    return (
      <div id="video-grid">
        {[...Array(30)].map((_, i) => {
          // eslint-disable-next-line react/no-array-index-key
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

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.shape({
        videoId: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool,
};

VideoGrid.defaultProps = {
  isFetching: false,
};

export default VideoGrid;
