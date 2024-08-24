import { useState, useEffect, useRef } from 'react';
import userRoomStore from '../../store/userRoomStore';
import { addFeed, feedPatch } from '../../service/Feed/feedApi';
import { useNavigate } from 'react-router-dom';

const NewFeedForm = ({ feed }) => {
    const roomId = userRoomStore((state) => state.roomId);

    const [content, setContent] = useState('');
    const [existingImages, setExistingImages] = useState([]); 
    const [newImages, setNewImages] = useState([]); 
    const [isEdit, setIsEdit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const textareaRef = useRef(null);
    const navigate = useNavigate();

    // 새로운 피드 작성 함수
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        addFeed(roomId, newImages, content)
            .then(() => navigate('/main/feed'))
            .finally(() => setIsSubmitting(false))
    };

    // 피드 수정 함수
    const handleEdit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const allImages = [...existingImages, ...newImages];
        feedPatch(feed[0].feedId, roomId, allImages, content)
            .then(() => navigate('/main/feed'))
            .finally(() => setIsSubmitting(false))
    };

    // 실행 시 feed값이 있으면 수정 페이지임, 값을 지정해놓기
    useEffect(() => {
        if (feed) {
            setContent(feed[0].content);
    
            const fetchImages = async () => {
                const files = await Promise.all(
                    feed[0]?.images?.map(async (element) => {
                        const response = await fetch(`https://flolink-s3.s3.ap-northeast-2.amazonaws.com/${element.imageUrl}`);
                        const blob = await response.blob();
                        return new File([blob], element.imageUrl, { type: blob.type });
                    })
                );
                setExistingImages(files);
            };
    
            fetchImages().catch((error) => console.error('Error fetching images:', error));
    
            setIsEdit(true);
        }
    }, [feed]);

    // 이미지 추가 함수
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prevImages) => [...prevImages, ...files]);
    };

    // 이미지 삭제 함수
    const removeImage = (index) => {
        if (index < existingImages.length) {
            setExistingImages(existingImages.filter((_, i) => i !== index));
        } else {
            const newImageIndex = index - existingImages.length;
            setNewImages(newImages.filter((_, i) => i !== newImageIndex));
        }
    };

    const allImages = [...existingImages, ...newImages];
    console.log(allImages);
    return (
        <form onSubmit={(e) => (isEdit ? handleEdit(e) : handleSubmit(e))} className="border border-black p-4 rounded-lg shadow-md h-full flex flex-col">
            <div className="flex items-center mb-4">
                <label className="cursor-pointer flex items-center">
                    <span className="text-gray-500 text-sm mr-2">+사진 추가</span>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            {allImages.length > 0 && (
                <div className="mb-4 overflow-x-auto whitespace-nowrap">
                    <div className="flex space-x-2">
                        {allImages.map((image, index) => (
                            <div key={index} className="relative inline-block w-24 h-24">
                                <div className="w-full h-full aspect-square overflow-hidden rounded-md">
                                    <img
                                        src={ URL.createObjectURL(image) }
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <textarea
                ref={textareaRef}
                className="w-full flex-1 p-2 rounded-md bg-transparent resize-none bg-white/40"
                value={content}
                rows={8}
                onChange={(e) => setContent(e.target.value)}
                style={{ whiteSpace: 'pre-line' }}
                placeholder="Write your diary here..."
            />
            <button
                type="submit"
                className={`mt-4 px-4 py-2 rounded-md self-end ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
                disabled={isSubmitting}
            >
                {isSubmitting ? '제출 중...' : '제출'}
            </button>
        </form>
    );
};

export default NewFeedForm;
