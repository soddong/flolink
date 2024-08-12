import React from 'react';

function NicknameField({ label, type = 'text', placeholder, value, onChange }) {
  return (
    <div className="w-full">
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded focus:outline-none focus:border-pink-500"
      />
    </div>
  );
}

export default NicknameField;
