import React from 'react';

function IdField({ label, type = 'text', placeholder, setUsername, setUsernameMessage}) {
    const handleUsernameChange = (e) => {    
        setUsername(e.target.value);
        setUsernameMessage('');
      };
  return (
    <div className="w-full">
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleUsernameChange}
            className="w-full p-2 border rounded focus:outline-none focus:border-pink-500"
        />
    </div>

  );
}

export default IdField;