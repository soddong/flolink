import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const FeedItem = ({ feed, currentUser, onEditComment, onDeleteComment }) => {
  const [showAllComments, setShowAllComments] = useState(false);

  return (
    <div className="p-4 rounded-lg mb-4">
      {Array.isArray(feed.images) && feed.images.length > 0 ? (
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          swipeable={true} // 손으로 넘길 수 있도록 설정
          emulateTouch={true} // 터치 이벤트를 에뮬레이션
        >
          {feed.images.map((src, index) => (
            <div key={index}>
              <img src={src} alt={`feed-${index}`} className="w-full h-auto rounded-md" />
            </div>
          ))}
        </Carousel>
      ) : (
        <img src={feed.images} alt="Feed" className="w-full h-auto rounded-md" />
      )}
      <div className="mt-4">
        <p>{feed.content}</p>
        <p><strong>작성자:</strong> {feed.author}</p>
        <p><strong>날짜:</strong> {feed.date}</p>
      </div>

      <div className="mt-4 flex justify-between text-gray-600 text-sm">
        <span>댓글 {feed.comments.length}</span>
      </div>
      
      {feed.author === currentUser && (
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-transparent text-blue-500 font-semibold py-2 px-4 border border-yellow-500 rounded">
            ✏️
          </button>
          <button className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded">
            🗑️
          </button>
        </div>
      )}

      <div className="mt-4">
        {feed.comments.slice(0, showAllComments ? feed.comments.length : 2).map((comment, index) => (
          <div key={index} className="text-gray-700 mb-2 flex justify-between items-center">
            <div>
              <strong>{comment.author}:</strong> {comment.content}
            </div>
            
            {comment.author === currentUser && (
              <div className="flex space-x-2">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEditComment(feed.id, index)}
                >
                  수정
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => onDeleteComment(feed.id, index)}
                >
                  삭제
                </button>
              </div>
            )}
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
