import React from 'react';
import { Card, Placeholder, Button } from 'semantic-ui-react';

const VideoCardPlaceholder = () => {
  return (
    <Card fluid>
      <Placeholder>
        <Placeholder.Image rectangular />
      </Placeholder>

      <Card.Content>
        <Placeholder>
          <Placeholder.Header>
            <Placeholder.Line length="medium" />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Card.Content>

      <Card.Content extra>
        <Button disabled color="violet">
          Join
        </Button>
      </Card.Content>
    </Card>
  );
};

export default VideoCardPlaceholder;
