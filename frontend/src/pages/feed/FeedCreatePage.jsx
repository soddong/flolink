import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedForm from '../../components/feed/FeedForm';
import logo from '../../assets/logo/logo.png';

const FeedCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-custom-gradient p-4">
      <header className="mb-4 flex justify-center items-center relative">
        <button 
          className="absolute left-4 text-xl text-black"
          onClick={() => navigate('/feedlist')}
        >
          &lt;
        </button>
        <img src={logo} alt="Logo" className="h-20" />
      </header>
      {/* <h1 className="text-center text-sm font-bold mb-4">Write your own diary</h1> */}
      <div className="mt-4">
        <FeedForm />
      </div>
    </div>
  );
};

export default FeedCreatePage;
