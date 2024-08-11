import { useState, useEffect } from 'react'
import logo from '../../assets/logo/logo.png'
import '../../css/feed/feedStyles.module.css'
import userRoomStore from '../../store/userRoomStore'
import mainStore from '../../store/mainStore'
import NewFeedList from '../../components/feed/NewFeedList'
import { fetchFeedList } from '../../service/Feed/feedApi'

const NewFeedListPage = () => {
    const roomId = userRoomStore((state) => state.roomId)
    const roomDetail = userRoomStore((state) => state.roomDetail)
    //현재 날짜 이따 고치기
    const lastFeedDate = new Date(
        new Date().getTime() + 9 * 60 * 60 * 1000
    ).toISOString()

    const currentPage = mainStore((state) => state.currentPage);
    const setCurrentPage = mainStore((state) => state.setCurrentPage);
    
    const [feeds, setFeeds] = useState([])

    useEffect (() => {
        try {
            fetchFeedList(roomId, lastFeedDate, 20).then(({ data }) => {
                const updatedfeeds = data; 

                updatedfeeds?.forEach((feed) => {
                    const matchingMember = roomDetail.data.memberInfoResponses.find(
                        (member) => member.targetUserRoomId === feed.authorUserRoomId
                    );
            
                   
                    if (matchingMember) {
                        feed.author = matchingMember.targetNickname;
                    }
                });
            
                setFeeds(updatedfeeds); 
            });
        } catch(error) {
            console.log(error)
        }
    }, [])
    
    //피드가 없을 때,
    if (feeds.length === 0) {
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
                            onClick={() => setCurrentPage('feedcreate')}
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
                        <NewFeedList feeds={feeds} setFeeds={setFeeds}/>
                    </div>
                </div>
                <button
                    className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
                    onClick={() => setCurrentPage('feedcreate')}
                    style={{ bottom: "6rem", right: "3rem", opacity: 0.3 }}
                >
                    +
                </button>
            </div>
        )
    }
}

export default NewFeedListPage;