
const NewFeedComment = () => {
    
    const [showAllComments, setShowAllComments] = useState({});

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

    //댓글 펼치기 로직
    const toggleComments = (feedId) => {
        setShowAllComments(prev => ({
            ...prev,
            [feedId]: !prev[feedId]
        }));
    };
    
    return (
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
    )
}

export default NewFeedComment;