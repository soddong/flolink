import React, { useState } from 'react';
import logo from '../assets/logo.png';
import FeedList from '../components/FeedList';

const FeedListPage = () => {
  const [feeds, setFeeds] = useState([
    {
      image: 'https://via.placeholder.com/400',
      content: '좋은 시간, 좋은 분위기',
      author: '로콜리',
      date: '2024-07-25 23:20',
      likes: 10,
      comments: [
        { author: 'user1', content: '멋져요!' },
        { author: 'user2', content: '좋아요!' }
      ],
    },
    
  ]);

  return (
    <div className="min-h-screen bg-custom-gradient">
      
    <img src={logo} alt="Logo" className="mx-auto h-20" />
      
      <div className="p-4">
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="검색" 
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <FeedList feeds={feeds} />
      </div>
    </div>
  );
};

export default FeedListPage;
