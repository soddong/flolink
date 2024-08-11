import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import userRoomStore from '../../store/userRoomStore';
import { feedDelete } from '../../service/Feed/feedApi';

const NewFeedList = ({feeds, setFeeds, refreshFeedList}) => {

    const navigate = useNavigate();

    const myUserRoomId = userRoomStore((state) => state.userRoomId);
    const currentUser = userRoomStore((state) => state.myInfo)

    const [showAllComments, setShowAllComments] = useState({});
    const [newComments, setNewComments] = useState({});

    // 댓글 입력 처리 함수
    const handleCommentChange = (feedId, value) => {
        setNewComments(prev => ({...prev, [feedId]: value}));
    };

    // 댓글 추가 로직
    const handleAddComment = (e, feedId) => {
        e.preventDefault();
        console.log('myUserRoomId : ')
        console.log(myUserRoomId.data)
        console.log('currentUser : ')
        console.log(currentUser.data)

        setFeeds(prevFeeds => prevFeeds.map(feed => 
            feed.feedId === feedId ? {
                ...feed,
                comments : [...feed.comments, { author: currentUser.data.nickname , content: newComments[feedId] || '' }]
            } : feed
        ));

        // 댓글 추가 후 해당 피드의 입력 필드 초기화
        setNewComments(prev => ({...prev, [feedId]: ''}));
    }

    //댓글 수정 로직
    const handleEditComment = (feedId, commentIndex) => {
        const feedIndex = feeds.findIndex(feed => feed.feedId === feedId);
        if (feedIndex !== -1) {
            const newContent = prompt('수정할 댓글 내용을 입력하세요 :', feeds[feedIndex].comments[commentIndex].content)
            if (newContent) {
                setFeeds(prevFeeds => {
                    const updatedFeeds = [...prevFeeds];
                    updatedFeeds[feedIndex].comments[commentIndex].content = newContent;
                    return updatedFeeds;
                })
            }
        }
    }

    //댓글 삭제 로직
    const handleDeleteComment = (feedId, commentIndex) => {
        setFeeds(prevFeeds => {
            const updatedFeeds = prevFeeds.map(feed =>
                feed.feedId === feedId ? {
                    ...feed,
                    comments : feed.comments.filter((_, cIndex) => cIndex !== commentIndex )
                } : feed
            )
            return updatedFeeds;
        })
    }

    //피드 수정 페이지 이동 로직, ****이미지 어케 처리할지 해결해야함*****
    const handleEditFeed = (feedId) => {
        const feed = feeds.filter(feed => feed.feedId === feedId);
        navigate('/main/feed/create', { state: { feed } })
    }

    //피드 삭제 로직 ****method not allow issue***
    const handleDeleteFeed = (feedId) => {
        feedDelete(feedId).then(() => {
            refreshFeedList();
        })
    }

    //댓글 펼치기 로직
    const toggleComments = (feedId) => {
        setShowAllComments(prev => ({
            ...prev,
            [feedId]: !prev[feedId]
        }));
        console.log(feeds)
    };

    return (
        <div className="mt-4">
            { feeds.map((feed) => (
                <div className="p-4 rounded-lg mb-4">
                    {
                        Array.isArray(feed.images) && feed.images.length > 0 ? (
                            <Carousel
                                showArrows={true}
                                showThumbs={false}
                                showStatus={false}
                                infiniteLoop={true}
                                swipeable={true}
                                emulateTouch={true}
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
                    <div className="mt-4">
                        <p>{feed.content}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div>
                            <p><strong>작성자:</strong> {feed.author}</p>
                            <p><strong>날짜:</strong> {feed.date}</p>
                        </div>
                        {feed.authorUserRoomId === myUserRoomId.data && (
                            <div className="flex space-x-2">
                                <button className="bg-transparent text-blue-500 font-semibold py-1 px-2 border border-yellow-500 rounded"
                                onClick={() => handleEditFeed(feed.feedId)}>
                                    ✏️
                                </button>
                                <button className="bg-transparent text-blue-700 font-semibold py-1 px-2 border border-blue-500 rounded"
                                onClick={() => handleDeleteFeed(feed.feedId)}>
                                    🗑️
                                </button>
                            </div>
                        )}
                    </div>

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
                                            className="text-blue-500 hover:underline"
                                            onClick={() => handleEditComment(feed.feedId, index)}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() => handleDeleteComment(feed.feedId, index)}
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
                        <input
                            type="text"
                            value={newComments[feed.feedId] || ''}
                            onChange={(e) => handleCommentChange(feed.feedId, e.target.value)}
                            className="flex-1 p-2 border rounded-l-md focus:outline-none"
                            placeholder="댓글을 입력하세요..."
                        />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
                            등록
                        </button>
                    </form>
                </div>
            ))}
        </div>
    )
}

export default NewFeedList;