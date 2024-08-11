import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ message }) => (
  <p className="text-zinc-800">{message}</p>
);

Question.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Question;
