import React from 'react';
import PropTypes from 'prop-types';
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

Message.propTypes = {
  message: PropTypes.shape({
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({
      nickname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Message;
