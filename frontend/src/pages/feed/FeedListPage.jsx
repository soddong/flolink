import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import FeedList from "../../components/feed/FeedList";
import "../../css/feed/feedStyles.module.css";
// import { getFeedList } from "../../service/Feed/feedApi";
import userRoomStore from "../../store/userRoomStore";

// 구현할 목록
// FeedListPage : feedList를 feedItem으로 하나씩 불러오는중
// FeedEditPage : 피드 수정 페이지 -> FeedForm 하위 컴포넌트
// FeedCreatePage : 피드 제작 페이지 -> FeedForm 하위 컴포넌트

//



// 피드 페이지의 최상단. 피드 리스트들을 불러온다. 
// feedList로 전체 피드들을 조회해온다. -> 왜 현재 시간을 프론트에서 체크해서 보내나? 궁금
const FeedListPage = ({ setCurrentPage, setCurrentData }) => {
  const navigate = useNavigate();
  const currentUser = "user1";
  const roomId = userRoomStore((state) => state.roomId);
  const [feeds, setFeeds] = useState([]);
  const roomDetail = userRoomStore((state) => state.roomDetail);
  useEffect(() => {
    const lastFeedDate = new Date(
      new Date().getTime() + 9 * 60 * 60 * 1000
    ).toISOString();
    getFeedList(roomId, lastFeedDate)
        .then(({ data }) => {
          // memberInfoMap은 전체 피드 순회하며 targetUserRoomId : targetNickname 이렇게 옵젝에 저장한건데, 굳이 이럴필요가 있나?  
          const memberInfoMap = roomDetail.data.memberInfoResponses.reduce(
            (acc, member) => {
              acc[member.targetUserRoomId] = member.targetNickname;
              return acc;
            },
            {}
          );
        console.log(data)
          //feedList로 받아온 data를 순회하면서 댓글마다 author 와 그에 상응하는 닉네임 변수를 넣어서 코멘트를 업데이트한다.
        const updatedData = data.map((feed) => {
          const updatedComments = feed.comments.map((comment) => (
            {
            ...comment,
            author: memberInfoMap[comment.userRoomId] || "기본닉네임",
          }));
  
          return { ...feed, comments: updatedComments };
        });
        // console.log(updatedData)
  
        setFeeds((prev) => [...prev, ...updatedData]);
      });
  }, []);
//피드가 없을때, 
  if (feeds.length === 0) {
    return (
      // <div className='min-h-screen bg-custom-gradient'>
      <div className="w-full min-h-screen bg-custom-gradient flex flex-col items-center justify-center">
        <img src={logo} alt="Logo" className="mx-auto h-20" />
        <div className="p-4 overflow-auto">
          <FeedList feeds={feeds} setCurrentPage={setCurrentPage} setCurrentData={setCurrentData}/>
        </div>
      </div>
    );
  } else {
    // 피드 있을때
    return (
      <div className="w-full h-full min-h-screen bg-custom-gradient relative">
        <header className="mb-4 flex justify-center items-center relative p-4">
          {/* 뒤로가기 필요한가? */}
          <button
            className="absolute left-4 text-xl text-black p-4"
            onClick={() => navigate("/main")}
          >
            &lt;
          </button>
          <img src={logo} alt="Logo" className="mx-auto h-20" />
        </header>
        <div className="flex flex-col h-4/5 pt-0 pr-0 pl-0 pb-9">
          <div className="flex-1 overflow-auto hide-scrollbar">
            <FeedList feeds={feeds} currentUser={currentUser} setCurrentPage={setCurrentPage} setCurrentData={setCurrentData}/>
          </div>
        </div>
        {/* 추가하기 버튼인데 수정페이지로 가네.. */}
        <button
          className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
          onClick={() => setCurrentPage('feedcreate')}
          style={{ bottom: "6rem", right: "3rem", opacity: 0.3 }}
        >
          +
        </button>
        
      </div>
    );
  }
};

export default FeedListPage;