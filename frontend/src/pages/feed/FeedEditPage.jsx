import React from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import FeedForm from '../../components/feed/FeedForm';
import logo from '../../assets/logo/logo.png';

const FeedEditPage = ({feed}) => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const {feed} = location.state || {};
  const thisfeed = {feed}
  
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
      <h1 className="text-center text-sm font-bold mb-16">피드 수정하기</h1>
      <div className="mt-4">
        <FeedForm feed={thisfeed}/>
      </div>
    </div>
  );
};

export default FeedEditPage;