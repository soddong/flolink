import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeedForm from '../../components/feed/FeedForm';
import logo from '../../assets/logo/logo.png';
import userRoomStore from '../../store/userRoomStore';
const FeedCreatePage = () => {
  const navigate = useNavigate();
  const roomId = userRoomStore((state)=>state.roomId);
  return (
    <div className="min-h-screen bg-custom-gradient p-4">
      <header className="mb-4 flex justify-center items-center relative">
        <button 
          className="absolute left-4 text-xl text-black"
          onClick={() => navigate(-1)}
        >
          &lt;
        </button>
        <img src={logo} alt="Logo" className="h-20" />
      </header>
      <h1 className="text-center text-sm font-bold mb-16">Write your own diary</h1>
      <div className="mt-4">
        <FeedForm roomId={roomId} />
      </div>
    </div>
  );
};

export default FeedCreatePage;
