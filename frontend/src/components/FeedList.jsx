import React from 'react';
import FeedItem from './FeedItem';

const FeedList = ({ feeds }) => {
  return (
    <div className="mt-4">
      {feeds.length > 0 ? (
        feeds.map((feed, index) => <FeedItem key={index} feed={feed} />)
      ) : (
        <div className="text-center text-gray-600">피드가 없습니다</div>
      )}
    </div>
  );
};

export default FeedList;
