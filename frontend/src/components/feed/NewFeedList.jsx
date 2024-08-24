import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import userRoomStore from '../../store/userRoomStore';
import { AddComment, DeleteComment } from '../../service/Feed/feedApi';
import { format, differenceInMinutes, differenceInHours, isToday } from 'date-fns';
import ImageModal from './ImageModal';

const NewFeedList = ({feeds, setFeeds, refreshFeedList, onDelete}) => {

    const navigate = useNavigate();

    const myUserRoomId = userRoomStore((state) => state.userRoomId);
    const roomId = userRoomStore((state) => state.roomId);
    const roomDetail = userRoomStore((state) => state.roomDetail);

    const [showAllComments, setShowAllComments] = useState({});
    const [newComments, setNewComments] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalImages, setModalImages] = useState([]);

    //이미지 모달창 띄우는 함수
    const handleImageClick = (images) => {
        setModalImages(images);
        setModalIsOpen(true);
    };

    //이미지 모달창 닫는 함수
    const handleCloseModal = () => {
        setModalIsOpen(false);
        setModalImages([]);
    };

    // 댓글 입력 처리 함수
    const handleCommentChange = (feedId, value) => {
        setNewComments(prev => ({...prev, [feedId]: value}));
    };

    // 댓글 추가 로직
    const handleAddComment = (e, feedId) => {
        e.preventDefault();
        console.log(roomDetail)
        AddComment(feedId, roomId, newComments[feedId])
        .then(() => {
            setNewComments(prev => ({...prev, [feedId]: ''}));
            refreshFeedList();
        })
    }

    //댓글 삭제 로직
    const handleDeleteComment = (feedId, commentId) => {
        DeleteComment(feedId, commentId)
        .then(() => {
            refreshFeedList();
        })
    }

    //피드 수정 페이지 이동 로직, ****이미지 어케 처리할지 해결해야함*****
    const handleEditFeed = (feedId) => {
        const feed = feeds.filter(feed => feed.feedId === feedId);
        navigate('/main/feed/create', { state: { feed } })
    }

    //댓글 펼치기 로직
    const toggleComments = (feedId) => {
        setShowAllComments(prev => ({
            ...prev,
            [feedId]: !prev[feedId]
        }));
        console.log(feeds)
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
    
        if (isToday(date)) {
            const diffInMinutes = differenceInMinutes(now, date);
            const diffInHours = differenceInHours(now, date);
    
            if (diffInMinutes < 60) {
                return `${diffInMinutes}분 전`;
            } else if (diffInHours < 24) {
                return `${diffInHours}시간 전`;
            }
        }
    
        return format(date, 'yyyy년 MM월 dd일');
    }

    return (
        <div className="mt-4">
            { feeds.map((feed) => (
                <div className="p-4 rounded-lg mb-4 bg-white/30"
                style={{ boxShadow: "0px 0px 10px 0px #00000034" }}>
                    {
                        Array.isArray(feed.images) && feed.images.length > 0 ? (
                            <Carousel
                                showArrows={true}
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop={true}
                                swipeable={true}
                                emulateTouch={true}
                                onClickItem={() => handleImageClick(feed.images)}
                            >
                                {feed.images.map((src, index) => (
                                    <div key={index} className='relative w-full h-64'>
                                    <img src={`https://flolink-s3.s3.ap-northeast-2.amazonaws.com/${feed?.images[index]?.imageUrl}`} alt={`feed-${index}`} className="absolute inset-0 w-full h-full object-cover rounded-md" />
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <template></template>
                        )
                    }
                    <div className="mt-4 break-words">
                        <p>{feed.content}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p><strong>작성자:</strong> {feed.author}</p>
                            <p><strong>날짜:</strong> {formatDate(feed.date)}</p>
                        </div>
                        {feed.authorUserRoomId === myUserRoomId.data && (
                            <div className="flex space-x-2">
                                <button className="bg-transparent text-blue-500 font-semibold py-1 px-2 border border-yellow-500 rounded"
                                onClick={() => handleEditFeed(feed.feedId)}>
                                    ✏️
                                </button>
                                <button className="bg-transparent text-blue-700 font-semibold py-1 px-2 border border-blue-500 rounded"
                                onClick={() => onDelete(feed.feedId)}>
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>
                    <hr className='w-full border-black/30 mt-2' />
                    <div className="mt-4 flex justify-between text-gray-600 text-sm">
                        <span>댓글 {feed.comments.length}</span>
                    </div>

                    <div className="mt-4">
                        {
                            feed.comments.slice(0, showAllComments[feed.feedId] ? feed.comments.length : 2).map((comment, index) => (
                                <div key={index} className="text-gray-700 mb-2 flex justify-between items-center">
                                    <div>
                                        <strong>{comment.author}:</strong> {comment.content}
                                    </div>
                                    {comment.userRoomId === myUserRoomId.data && (
                                    <div className="flex space-x-2">
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleDeleteComment(feed.feedId, comment.commentId)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                    )}
                                </div>
                            ))
                        }
                        {
                            feed.comments.length > 2 && (
                                <button
                                    className="text-blue-500"
                                    onClick={() => toggleComments(feed.feedId)}
                                >
                                    {showAllComments[feed.feedId] ? '댓글 숨기기' : '댓글 더보기'}
                                </button>
                            )
                        }
                    </div>

                    <form onSubmit={(e) => handleAddComment(e, feed.feedId)} className="mt-4 flex">
                        <textarea
                            value={newComments[feed.feedId] || ''}
                            onChange={(e) => handleCommentChange(feed.feedId, e.target.value)}
                            className="flex-1 p-2 border rounded-l-md focus:outline-none resize-none overflow-y-auto"
                            placeholder="댓글을 입력하세요..."
                            rows={1}
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                            등록
                        </button>
                    </form>
                </div>
            ))}
            <ImageModal isOpen={modalIsOpen} onClose={handleCloseModal} images={modalImages} />
        </div>
    )
}

export default NewFeedList;