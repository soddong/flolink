import React, { useState } from 'react';
import { Router, useNavigate } from 'react-router-dom';
import FeedItem from './FeedItem';


const FeedList = ({ feeds: initialFeeds, currentUser }) => {
  const [feeds, setFeeds] = useState(initialFeeds);
  console.log(feeds)
  const handleAddComment = (feedId, commentContent) => {
    setFeeds(prevFeeds => prevFeeds.map(feed => 
      feed.feedId === feedId ? {
        ...feed,
        comments: [...feed.comments, { author: currentUser, content: commentContent }]
      } : feed
    ));
  };


  const handleEditComment = (feedId, commentIndex) => {
    const feedIndex = feeds.findIndex(feed => feed.feedId === feedId);
    if (feedIndex !== -1) {
      const newContent = prompt('수정할 댓글 내용을 입력하세요:', feeds[feedIndex].comments[commentIndex].content);
      if (newContent) {
        setFeeds(prevFeeds => {
          const updatedFeeds = [...prevFeeds];
          updatedFeeds[feedIndex].comments[commentIndex].content = newContent;
          return updatedFeeds;
        });
      }
    }
  };

  const handleDeleteComment = (feedId, commentIndex) => {
    setFeeds(prevFeeds => {
      const updatedFeeds = prevFeeds.map(feed => 
        feed.feedId === feedId ? {
          ...feed,
          comments: feed.comments.filter((_, cIndex) => cIndex !== commentIndex)
        } : feed
      );
      return updatedFeeds;
    });
  };
  //   const feedIndex = feeds.findIndex(feed => feed.feedId === feedId);
  //   if (feedIndex !== -1) {
  //     const updatedFeeds = [...feeds];
  //     updatedFeeds[feedIndex].comments = updatedFeeds[feedIndex].comments.filter((_, cIndex) => cIndex !== commentIndex);
  //     setFeeds(updatedFeeds);
  //   }
  // };

  const handleEditFeed = (feedId) => {
    const feed = feeds.filter(feed => feed.feedId === feedId);
    
    navigate("/feededit",{state:{feed}});
  };

  const handleDeleteFeed = (feedId) => {
    console.log(feedId);
    // setFeeds(prevFeeds => prevFeeds.filter(feed => feed.feedId !== feedId));
  };
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <FeedItem
            key={index}
            feed={feed}
            currentUser={currentUser}
            onAddComment={handleAddComment}
            onEditComment={handleEditComment}
            onDeleteComment={handleDeleteComment}
            onEditFeed={handleEditFeed}
            onDeleteFeed={handleDeleteFeed}
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
