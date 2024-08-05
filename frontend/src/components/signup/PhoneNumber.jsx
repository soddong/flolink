import React from 'react';

function PhoneNumberField({ label, type = 'text', placeholder, setPhoneNumber}) {

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value)
    }
  return (


    <div className="w-full">
        <label className="block text-gray-700 mb-1">{label}</label>
        <input
            type={type}
            onChange={handlePhoneNumberChange}
            placeholder={placeholder}
            className="w-full p-2 border rounded focus:outline-none focus:border-pink-500"
        />
    </div>

  );
}

export default PhoneNumberField;