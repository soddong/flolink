// src/components/FeedItem.js
import React, { useState } from 'react';

const FeedItem = ({ feed }) => {
  const [liked, setLiked] = useState(false); // 좋아요 상태
  const [likes, setLikes] = useState(feed.likes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <img src={feed.image} alt="Feed" className="w-full h-auto rounded-md" />
      <div className="mt-4">
        <p>{feed.content}</p>
        <p><strong>작성자:</strong> {feed.author}</p>
        <p><strong>날짜:</strong> {feed.date}</p>
      </div>
      <div className="mt-4 flex justify-between text-gray-600 text-sm">
        <span>좋아요 {likes}</span>
        <span>댓글 {feed.comments.length}</span>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button 
          className={`px-3 py-1 rounded-md ${liked ? 'bg-red-500' : 'bg-blue-500'} text-white`} 
          onClick={handleLike}
        >
          {liked ? '좋아요 취소' : '좋아요'}
        </button>
        <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">수정</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded-md">삭제</button>
      </div>
    </div>
  );
};

export default FeedItem;
