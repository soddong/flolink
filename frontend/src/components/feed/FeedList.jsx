import React, { useState } from 'react';
import { Router, useNavigate } from 'react-router-dom';
import FeedItem from './FeedItem';
import { feedDelete } from '../../service/Feed/feedApi';

const FeedList = ({ feeds: initialFeeds, currentUser, setCurrentPage, setCurrentData }) => {
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
    setCurrentData(feed)
    setCurrentPage('feededit')
    // navigate("/feededit",{state:{feed}});
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
          <p className="mt-2">당신의 하루를 작성해보세요!</p>
          {/* <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => window.location.href = '/feedcreate'}
          >
            작성하기
          </button> */}
          {/* <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          onClick={() => window.location.href = '/feedcreate'}>
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              작성하기
              </span>
              </button> */}
              <button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => setCurrentPage('feedcreate')}>
              작성하기
              </button>
        </div>
      )}
    </div>
  );
};

export default FeedList;
