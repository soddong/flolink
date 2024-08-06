import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import FeedList from '../../components/feed/FeedList';
import NavBar from '../../components/common/nav_bar/NavBar';
import '../../css/feed/feedStyles.module.css';

const FeedListPage = () => {
  const navigate = useNavigate();
  const currentUser = 'user1';

  const [feeds, setFeeds] = useState([
    {
      feedId: 1,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdJjnvUgBV1lz_05tD6iP1Es8Kx7TQU1S2A&s',
        'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fit,w_730,h_730/k%2Farchive%2Fd852987f86aeae8b65926f9e7a260c28285ea744'
      ],
      content: '좋은 시간, 좋은 분위기',
      author: 'user1',
      date: '2024-07-25 23:20',
      comments: [
        { author: 'user1', content: '멋져요!' },
        { author: 'user2', content: '좋아요!' },
        { author: 'user3', content: '그뤠잇!' }
      ],
    },
    {
      feedId: 2,
      images: [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqdJjnvUgBV1lz_05tD6iP1Es8Kx7TQU1S2A&s'
      ],
      content: '남주혁 존잘',
      author: '로콜리',
      date: '2024-07-25 23:20',
      likes: 10,
      comments: [
        { author: 'user1', content: '멋져요!' },
        { author: 'user2', content: '좋아요!' },
        { author: 'user3', content: '그뤠잇!' }
      ],
    },
  ]);

  if (feeds.length === 0) {
    return (
      <div className='min-h-screen bg-custom-gradient'>
        <img src={logo} alt="Logo" className="mx-auto h-20" />
        <div className="p-4 overflow-auto">
          <FeedList feeds={feeds} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full h-full min-h-screen bg-custom-gradient relative">
        <header className="mb-4 flex justify-center items-center relative p-4">
          <button
            className="absolute left-4 text-xl text-black p-4"
            onClick={() => navigate('/main')}
          >
            &lt;
          </button>
          <img src={logo} alt="Logo" className="mx-auto h-20" />
        </header>
        <div className="flex flex-col h-4/5 pt-0 pr-0 pl-0 pb-9">
          <div className="flex-1 overflow-auto hide-scrollbar">
            <FeedList
              feeds={feeds}
              currentUser={currentUser}
              
            />
          </div>
        </div>
        <button
          className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
          onClick={() => navigate('/feedcreate')}
          style={{ bottom: '6rem', right: '3rem', opacity: 0.3 }}
        >
          +
        </button>
        <NavBar />
      </div>
    );
  }
}

export default FeedListPage;