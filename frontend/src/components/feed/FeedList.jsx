import React, { useState } from 'react';
import FeedItem from './FeedItem';

const FeedList = ({ feeds, currentUser }) => {
  const [feedList, setFeedList] = useState(feeds);

  const handleDeleteFeed = (id) => {
    setFeedList(feedList.filter(feed => feed.id !== id));
  };

  const handleEditComment = (feedIndex, commentIndex) => {
    const newContent = prompt('새로운 댓글 내용을 입력하세요:', feedList[feedIndex].comments[commentIndex].content);
    if (newContent) {
      const updatedFeedList = [...feedList];
      updatedFeedList[feedIndex].comments[commentIndex].content = newContent;
      setFeedList(updatedFeedList);
    }
  };

  const handleDeleteComment = (feedIndex, commentIndex) => {
    const updatedFeedList = feedList.map((feed, fIndex) => {
      if (fIndex === feedIndex) {
        return {
          ...feed,
          comments: feed.comments.filter((_, cIndex) => cIndex !== commentIndex)
        };
      }
      return feed;
    });
    setFeedList(updatedFeedList);
  };

  return (
    <div className="mt-4">
      {feedList.length > 0 ? (
        feedList.map((feed, index) => (
          <FeedItem
            key={index}
            feed={feed}
            onDelete={() => handleDeleteFeed(feed.id)}
            currentUser={currentUser}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
          />
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