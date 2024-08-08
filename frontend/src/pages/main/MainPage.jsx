import Notification from "../../components/main/notification/Notification";
import UserStatusList from "../../components/main/user_status/UserStatusList";
import PetStatusList from "../../components/main/tamagochi/PetStatusList";
import NavBar from "../../components/common/nav_bar/NavBar";
import Question from "../../components/main/today_question/Question";
import Pet1 from "../../assets/tamagochi/flower1.png";
import Pet2 from "../../assets/tamagochi/flower2.png";
import Pet3 from "../../assets/tamagochi/flower3.png";
import Pet4 from "../../assets/tamagochi/flower4.png";
import AlarmModal from "../../components/main/modal/AlarmModal";
import BackgroundPhoto from "../../assets/main/background_photo.png";
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/common/side_bar/SideBar";
import userRoomStore from "../../store/userRoomStore";


function MainPage() {
  const [status, setStatus] = useState({ level: 0, exp: 60 });
  const Message = "오늘은 어떤 일이 있었나요?";
  const { roomId, roomDetail, userRoomId, setUserRoomId, setRoomDetail, myInfo } = userRoomStore((state) => ({
    roomId: state.roomId,
    userRoomId: state.userRoomId,
    roomDetail: state.roomDetail?.data,
    myInfo: state.myInfo,
    setUserRoomId: state.setUserRoomId,
    setRoomDetail: state.setRoomDetail
  }));
  const [petstatus, setPetstatus] = useState(null)

  const updateLevel = (newLevel) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      level: newLevel
    }));
  };

  useEffect(() => {
    setUserRoomId(roomId)
    setRoomDetail(roomId)
    console.log(userRoomId.data);
    updateLevel(roomDetail.plantSummaryResponse?.nowLevel)
    if (status) {
      if (status.level === 1) {
        setPetstatus(Pet1)
      } else if (status.level === 2) {
        setPetstatus(Pet2)
      } else if (status.level === 3) {
        setPetstatus(Pet3)
      } else {
        setPetstatus(Pet4)
      }
    }
    console.log(status)
  }, []);
  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <Sidebar myInfo={myInfo} roomId={roomId} roomDetail={roomDetail} />
      <div className="py-7 w-5/6">
        <header className="flex justify-between">
          <h1 className="m-0 font-bold text-2xl text-rose-500">
            {roomDetail?.roomSummarizeResponse?.roomName}
          </h1>
          <AlarmModal />
        </header>
        <Notification notice={roomDetail?.roomSummarizeResponse?.notice} />
        <UserStatusList members={roomDetail?.memberInfoResponses} setRoomDetail={setRoomDetail} />
        <PetStatusList pet={petstatus} status={status} />
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
