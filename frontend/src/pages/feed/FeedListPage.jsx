import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';
import FeedList from '../../components/feed/FeedList';
import NavBar from '../../components/common/nav_bar/NavBar';
// import feedStyles from '../../css/feed/feedStyles.module.css';
import '../../css/feed/feedStyles.module.css';

const FeedListPage = () => {
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState([
    {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9gU5LyaXYrvd3hnKoUx8BjHih5a9WCb4_Q&s',
      content: '좋은 시간, 좋은 분위기',
      author: '로콜리',
      date: '2024-07-25 23:20',
      comments: [
        { author: 'user1', content: '멋져요!' },
        { author: 'user2', content: '좋아요!' },
        { author: 'user3', content: '그뤠잇!' }
      ],
    },
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-9gU5LyaXYrvd3hnKoUx8BjHih5a9WCb4_Q&s',
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
  if(feeds.length==0){
    return
    (
      <div className='min-h-screen bg-custom-gradient'>
          <img src={logo} alt="Logo" className="mx-auto h-20" />
          <div className="p-4 overflow-auto">
            <FeedList feeds={feeds} />
          </div>
      </div>
    );
  }else{
    return (
        <div className="w-full h-full min-h-screen bg-custom-gradient relative">
          <header className="mb-4 flex justify-center items-center relative">
            <button 
            className="absolute left-4 text-xl text-black"
            onClick={() => navigate('/main')}
            >
            &lt;
            </button>
            <img src={logo} alt="Logo" className="mx-auto h-20" />
          </header>
          <div className="p-4 flex flex-col h-4/5">
            <div className="flex-1 overflow-auto hide-scrollbar">
              <FeedList feeds={feeds} />
            </div>
          </div>
          <button
            className="bg-white border-black text-black  rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
            onClick={() => navigate('/feedcreate')}
            style={{ bottom: '6rem', right: '3rem', opacity: 0.3 }}
          >
            +
          </button>
          < NavBar />
        </div>
      );
  };
}
    
     
  


export default FeedListPage;


// import React, { useState } from 'react';
// import logo from '../assets/logo.png';
// import FeedList from '../components/FeedList';

// const FeedListPage = () => {
//   const [feeds, setFeeds] = useState([]); // 초기에는 빈 배열로 설정

//   return (
//     <div className="min-h-screen bg-custom-gradient">
//         <img src={logo} alt="Logo" className="mx-auto h-20" />
      
//         <div className="p-4">
//             <FeedList feeds={feeds} />
//         </div>
//     </div>
//   );
// };

// export default FeedListPage;
