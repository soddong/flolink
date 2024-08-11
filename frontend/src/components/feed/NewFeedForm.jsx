import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState, useRef } from 'react';
import userRoomStore from '../../store/userRoomStore';
import { addFeed } from '../../service/Feed/feedApi';
import { useNavigate } from 'react-router-dom';

const NewFeedForm = () => {
    const roomId = userRoomStore((state)=>state.roomId);

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const textareaRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit =  (e) => {
        e.preventDefault();
        addFeed(roomId,images,content)
        .then(()=>navigate('/main/feed'));
    }

    //이미지 추가 함수
    //이미지 리스트를 수정하는거 추가
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    return (
        <form onSubmit={handleSubmit} className="border border-black p-4 rounded-lg shadow-md h-full flex flex-col">
            <div className="flex items-center mb-4">
                <label className="cursor-pointer flex items-center">
                    <span className="text-gray-500 text-sm mr-2">+image</span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                    {images.length > 0 && (
                        <Carousel className="mt-2 w-full" showThumbs={false}>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <img src={URL.createObjectURL(image)} alt={`Uploaded ${index + 1}`} />
                                </div>
                            ))}
                        </Carousel>
                    )}
                </label>
            </div>
            <textarea
                ref={textareaRef}
                className="w-full flex-1 p-2 rounded-md bg-transparent resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ whiteSpace: 'pre-line' }}
                placeholder="Write your diary here..."
            />
            <button
                type="submit"
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md self-end"
            >
                제출
            </button>
        </form>
    );
}


export default NewFeedForm;