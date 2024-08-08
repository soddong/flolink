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
  const [status, setStatus] = useState({ level: 0, exp: 0 });
  const Message = "오늘은 어떤 일이 있었나요?";
  const { roomId, roomDetail, setRoomDetail, myInfo } = userRoomStore((state) => ({
    roomId: state.roomId,
    userRoomId: state.userRoomId,
    roomDetail: state.roomDetail?.data,
    myInfo: state.myInfo,
    setUserRoomId: state.setUserRoomId,
    setRoomDetail: state.setRoomDetail
  }));
  const [petstatus, setPetstatus] = useState(null)


  function handlePetStatus (data) {
    if (data) {
      if (data === 1) {
        setPetstatus(Pet1)
      } else if (data === 2) {
        setPetstatus(Pet2)
      } else if (data === 3) {
        setPetstatus(Pet3)
      } else {
        setPetstatus(Pet4)
      }
    }
  }
  
  useEffect(() => {
    setRoomDetail(roomId)
    console.log(roomDetail)
  }, []);

  useEffect(() => {
    const updateLevel = async () => {
      try {
        setStatus((prevStatus) => ({
        ...prevStatus, 
        level: roomDetail.plantSummaryResponse?.nowLevel,
        exp: roomDetail.plantSummaryResponse?.nowExp
        }));
        handlePetStatus(roomDetail.plantSummaryResponse?.nowLevel)
      } catch(error) {
        console.log(error)
      }
    } 
    updateLevel()
  }, [roomDetail])

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
        <UserStatusList />
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
