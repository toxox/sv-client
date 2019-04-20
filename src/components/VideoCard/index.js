import React from 'react';
import { Card, Image, Button, Popup } from 'semantic-ui-react';

const VideoCard = ({ video, onClick, isLoggedIn }) => {
  return (
    <Card fluid key={video.id.videoId}>
      <Image src={video.snippet.thumbnails.high.url} />
      <Card.Content>
        <Card.Header>{video.snippet.title}</Card.Header>
        <Card.Description>{video.snippet.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {isLoggedIn ? (
          <Button color="violet" onClick={onClick}>
            Join
          </Button>
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

export default VideoCard;
