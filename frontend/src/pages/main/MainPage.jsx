import Notification from "../../components/main/notification/Notification";
import UserStatusList from "../../components/main/user_status/UserStatusList";
import PetStatusList from "../../components/main/tamagochi/PetStatusList";
import NavBar from "../../components/common/nav_bar/NavBar";
import Question from "../../components/main/today_question/Question";
import Pet from "../../assets/tamagochi/flower1.png";
import AlarmModal from "../../components/main/modal/AlarmModal";
import BackgroundPhoto from "../../assets/main/background_photo.png";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/common/side_bar/SideBar";
import userRoomStore from "../../store/userRoomStore";
import {
  getMyRoomRole,
  getRoomMemberInfos,
} from "../../service/userroom/userroomApi";

function MainPage() {
  const [status, setStatus] = useState(60);
  const Message = "오늘은 어떤 일이 있었나요?";
  const roomId = userRoomStore((state) => state.roomId);
  const [myRole, setMyRole] = useState("member");
  const [roomDetail, setRoomDetail] = useState({
    memberInfoResponse: null,
    plantSummaryResponse: null,
    roomSummarizeResponse: null,
  });
  useEffect(() => {
    getMyRoomRole(roomId)
      .then(({ data }) => {
        setMyRole(data);
      })
      .catch((e) => {
        console.log(e);
      });
    getRoomMemberInfos(roomId)
      .then(({ data }) => {
        setRoomDetail(data);
      })
      .then(() => console.log(roomDetail))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <Sidebar />
      <div className="py-7 w-5/6">
        <header className="flex justify-between">
          <h1 className="m-0 font-bold text-2xl text-rose-500">
            우리는 꿀벌 가족🍯
          </h1>
          <AlarmModal />
        </header>
        <Notification notice={roomDetail?.roomSummarizeResponse?.notice} />
        <UserStatusList members={roomDetail?.memberInfoResponses} />
        <PetStatusList pet={Pet} status={status} />
      </div>
      <Question message={Message} />
      <img
        src={BackgroundPhoto}
        alt="background_photo"
        className="w-full absolute bottom-16"
      />
      <NavBar />
    </div>
  );
}

export default MainPage;
