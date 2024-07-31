import React, { useState } from 'react';

const FeedItem = ({ feed }) => {
  const [showAllComments, setShowAllComments] = useState(false);


  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md mb-4">
      <img src={feed.image} alt="Feed" className="w-full h-auto rounded-md" />
      <div className="mt-4">
    
        <p>{feed.content}</p>
        <p><strong>작성자:</strong> {feed.author}</p>
        <p><strong>날짜:</strong> {feed.date}</p>
      </div>

      <div className="mt-4 flex justify-between text-gray-600 text-sm">
        <span>댓글 {feed.comments.length}</span>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        {/* <button className="bg-yellow-500 text-white px-3 py-1 rounded-md">수정</button> */}
        <button className="bg-transparent text-blue-500 font-semibold py-2 px-4 border border-yellow-500 rounded">✏️</button>
        {/* <button className="bg-red-500 text-white px-3 py-1 rounded-md">삭제</button> */}
        <button className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded">🗑️</button>
      </div>
      <div className="mt-4">
        {feed.comments.slice(0, showAllComments ? feed.comments.length : 2).map((comment, index) => (
          <div key={index} className="text-gray-700 mb-2">
            <strong>{comment.author}:</strong> {comment.content}
          </div>
        ))}
        {feed.comments.length > 2 && (
          <button 
            className="text-blue-500"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? '댓글 숨기기' : '댓글 더보기'}
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedItem;


{/* <div className="p-4 rounded-lg shadow-md mb-4">
      <div className="border border-black rounded-md mb-4">
        <img src={feed.image} alt="Feed" className="w-full h-auto rounded-md" />
      </div>
      <div>
        <p>{feed.content}</p>
        <p><strong>작성자:</strong> {feed.author}</p>
        <p><strong>날짜:</strong> {feed.date}</p>
      </div> */}