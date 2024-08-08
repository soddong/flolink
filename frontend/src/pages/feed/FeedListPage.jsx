import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import FeedList from "../../components/feed/FeedList";
import "../../css/feed/feedStyles.module.css";
import { feedList } from "../../service/Feed/feedApi";
import userRoomStore from "../../store/userRoomStore";

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
      feedList(roomId, lastFeedDate).then(({ data }) => {
        const memberInfoMap = roomDetail.data.memberInfoResponses.reduce(
          (acc, member) => {
            acc[member.targetUserRoomId] = member.targetNickname;
            return acc;
          },
          {}
        );
        console.log(data)
  
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
    return (
      <div className="w-full h-full min-h-screen bg-custom-gradient relative">
        <header className="mb-4 flex justify-center items-center relative p-4">
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
        <button
          className="bg-white border border-black text-black rounded-full w-12 h-12 flex items-center justify-center text-2xl absolute"
          onClick={() => setCurrentPage('feededit')}
          style={{ bottom: "6rem", right: "3rem", opacity: 0.3 }}
        >
          +
        </button>
        
      </div>
    );
  }
};

export default FeedListPage;