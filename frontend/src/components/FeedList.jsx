// import React from 'react';
// import FeedItem from './FeedItem';

// const FeedList = ({ feeds }) => {
//   return (
//     <div className="mt-4">
//       {feeds.length > 0 ? (
//         feeds.map((feed, index) => <FeedItem key={index} feed={feed} />)
//       ) : (
//         <div className="text-center text-gray-600">피드가 없습니다</div>
//       )}
//     </div>
//   );
// };

// export default FeedList;

// src/components/FeedList.js
import React, { useState } from 'react';
import FeedItem from './FeedItem';

const FeedList = ({ feeds }) => {
  const [feedList, setFeedList] = useState(feeds);

  const handleDelete = (id) => {
    setFeedList(feedList.filter(feed => feed.id !== id));
  };

  return (
    <div className="mt-4">
      {feedList.length > 0 ? (
        feedList.map((feed, index) => (
          <FeedItem key={index} feed={feed} onDelete={handleDelete} />
        ))
      ) : (
        <div className="text-center text-gray-600">
          <p>피드가 없습니다</p>
          <p className="mt-2">피드를 작성해보세요!</p>
          <button 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => window.location.href = '/feedcreate'}
          >
            피드 작성하기
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedList;
