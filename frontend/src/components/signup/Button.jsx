import React from 'react';

function Button({ text, onClick, variant }) {
  const baseStyle = 'p-2 rounded text-center';
  const variants = {
    solid: 'bg-pink-500 text-white',
    outline: 'border border-pink-500 text-pink-500',
  };

  return (
    <button className={`${baseStyle} ${variants[variant]}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
