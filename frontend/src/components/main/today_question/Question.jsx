import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Question ({message}) {
  const navigate = useNavigate()

  return (
    <div className='w-full h-full flex justify-center items-center'
    onClick={(() => navigate('/main/feed/create'))}>
      <p className="text-zinc-800">{message}</p>
    </div>
  )
}

Question.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Question;
