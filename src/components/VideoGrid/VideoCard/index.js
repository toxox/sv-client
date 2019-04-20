import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button, Popup } from 'semantic-ui-react';
import './styles.scss';
import { Link } from '@reach/router';

const VideoCard = ({ video, isLoggedIn }) => {
  return (
    <Card fluid>
      <Image src={video.snippet.thumbnails.high.url} />
      <Card.Content>
        <Card.Header>{video.snippet.title}</Card.Header>
        <Card.Description>{video.snippet.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {isLoggedIn ? (
          <Link to={`/room/${video.id.videoId}`}>
            <Button color="violet">Join</Button>
          </Link>
        ) : (
          <Popup
            trigger={<Button color="violet">Join</Button>}
            content="Please log in to join this stream"
            inverted
          />
        )}
      </Card.Content>
    </Card>
  );
};

VideoCard.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  video: PropTypes.shape({
    id: PropTypes.shape({
      videoId: PropTypes.string.isRequired,
    }),
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        high: PropTypes.shape({
          url: PropTypes.string.isRequired,
        }),
      }),
    }),
  }).isRequired,
};

export default VideoCard;
