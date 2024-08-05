import React from 'react';
import FeedItem from './FeedItem';

const FeedList = ({ feeds, currentUser, onEditComment, onDeleteComment }) => {
  return (
    <div className="mt-4">
      {feeds.length > 0 ? (
        feeds.map((feed, index) => (
          <FeedItem
            key={index}
            feed={feed}
            currentUser={currentUser}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
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
