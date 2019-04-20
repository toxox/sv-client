import React from 'react';
import getColor from 'string-to-color';
import './styles.scss';

const Message = ({ message }) => {
  return (
    <div className="message">
      <strong
        style={{
          color: getColor(message.user.nickname),
        }}
      >
        {message.user.nickname}:{' '}
      </strong>
      {message.body}
    </div>
  );
};

export default Message;
