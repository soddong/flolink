import React, { useState, useEffect, useRef } from 'react';

const FeedForm = () => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.placeholder = "당신의 하루는 어떠셨나요?\n이야기를 작성해주세요";
    }
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 피드 제출 로직 추가
    console.log('내용:', content);
    console.log('이미지:', image);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-black p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <label className="cursor-pointer flex items-center">
            <span className="text-gray-500 text-sm mr-2">+image</span>
            <input
                type="file" 
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
            />
        </label>
        {image && <span className="ml-2">{image.name}</span>}
      </div>
      <textarea
        ref={textareaRef}
        className="w-full p-2 rounded-md bg-transparent"
        rows="4"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ whiteSpace: 'pre-line' }}
      ></textarea>
      <button 
        type="submit" 
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        제출
      </button>
    </form>
  );
};

export default FeedForm;
