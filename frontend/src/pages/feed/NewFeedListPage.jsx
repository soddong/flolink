import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo/logo.png'
import '../../css/feed/feedStyles.module.css'
import userRoomStore from '../../store/userRoomStore'
import NewFeedList from '../../components/feed/NewFeedList'
import { fetchFeedList, feedDelete } from '../../service/Feed/feedApi'

const NewFeedListPage = () => {
    const [feedList, setFeedList] = useState([])
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [feedToDelete, setFeedToDelete] = useState(null);
    const [lastFeedDate, setLastFeedDate] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const roomId = userRoomStore((state) => state.roomId)
    const roomDetail = userRoomStore((state) => state.roomDetail)

    const observerTarget = useRef(null)

    const closeModal = () => {
        setShowDeleteModal(false);
    };

    const confirmDelete = (feedId) => {
        setFeedToDelete(feedId);
        setShowDeleteModal(true);
    };

    //피드 삭제 로직 
    const handleDeleteFeed = () => {
        if (feedToDelete) {
            feedDelete(feedToDelete).then(() => {
                refreshFeedList();
                setShowDeleteModal(false);
            });
        }
    };

    const refreshFeedList = useCallback(() => {
        setIsLoading(true)
        fetchFeedList(roomId, '', 20).then(({ data }) => {
            const curData = processFeedData(data)
            setFeedList(curData)
            setLastFeedDate(curData[curData.length - 1]?.date || '')
            setIsLoading(false)
        })
    }, [roomId])

    const loadMoreFeeds = useCallback(() => {
        if (isLoading || !hasMore) return

        setIsLoading(true)
        fetchFeedList(roomId, lastFeedDate, 20).then(({ data }) => {
            if (data.length === 0) {
                setHasMore(false)
            } else {
                const newData = processFeedData(data)
                setFeedList(prevList => [...prevList, ...newData])
                setLastFeedDate(newData[newData.length - 1]?.date || '')
            }
            setIsLoading(false)
        })
    }, [roomId, lastFeedDate, isLoading, hasMore])

    const processFeedData = (data) => {
        return data?.map((feed) => {
            const updatedComments = feed?.comments.map((comment) => {
                const matchingMember = roomDetail?.data.memberInfoResponses.find(
                    (member) => member.targetUserRoomId === comment.userRoomId
                )
                return {
                    ...comment,
                    author:  matchingMember ? matchingMember.targetNickname : '',
                }
            })
            const updatedAuthor = roomDetail?.data.memberInfoResponses.find(
                (member) => member.targetUserRoomId === feed.authorUserRoomId
            )
            return {
                ...feed,
                comments: updatedComments,
                author: (updatedAuthor.targetNickname ? updatedAuthor.targetNickname : feed.author),
            }
        })
    }

    useEffect(() => {
        refreshFeedList()
    }, [refreshFeedList])

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMoreFeeds()
                }
            },
            { threshold: 1.0 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current)
            }
        }
    }, [loadMoreFeeds, isLoading])

    const navigate = useNavigate();

    const handleCreateFeed = () => {
        navigate('/main/feed/create');
    }
    
    //피드가 없을 때,
    if (feedList.length === 0) {
        return (
            <div className="w-full min-h-screen bg-custom-gradient flex flex-col items-center justify-center">
                <img src={logo} className="mx-auto h-20" />
                <div className="p-4 overflow-auto">
                    <div className="text-center text-gray-600">
                        <p>피드가 없습니다.</p>
                        <p className="mt-2">당신의 하루를 작성해보세요!</p>
                        <button 
                            type="button" 
                            className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                             onClick={ handleCreateFeed }
                        >
                            작성하기
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    //피드가 있을 때,
    else {
        return (
            <div className="w-full h-full min-h-screen bg-custom-gradient relative">
                <header className="mb-4 flex justify-center items-center relative p-4">
                    <img src={logo} alt="Logo" className="mx-auto h-20" />
                </header>
                <div className="flex flex-col h-4/5 pt-0 pr-5 pl-5 pb-9">
                    <div className="flex-1 overflow-auto hide-scrollbar">
                        <NewFeedList 
                            feeds={feedList} 
                            setFeeds={setFeedList} 
                            refreshFeedList={refreshFeedList} 
                            onDelete={confirmDelete}
                        />
                        {isLoading && <p>피드 가져오는 중...</p>}
                        {!isLoading && hasMore && <div ref={observerTarget} style={{ height: '20px' }}></div>}
                        {!hasMore && <p>더 이상 피드가 없습니다.</p>}
                    </div>
                </div>
                <button
                    className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
                    onClick={ handleCreateFeed }
                    style={{ bottom: "6rem", right: "3rem", opacity: 0.3 }}
                >
                    +
                </button>

                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 w-80">
                            <h3 className="text-lg font-semibold mb-4">정말 삭제하시겠습니까?</h3>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleDeleteFeed}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    삭제
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default NewFeedListPage;