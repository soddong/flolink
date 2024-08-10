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

import usePlantHook from '../../hook/plant/plantHook'; 
import LocationModal from '../../components/main/modal/LocationModal';
import PlantWalkButton from '../../components/main/plantwalk/PlantWalkButton';

function MainPage() {
  const [status, setStatus] = useState({ plantId: 0, level: 0, exp: 0, walker: 0 });
  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const Message = "오늘은 어떤 일이 있었나요?";
  const { roomId, userRoomId, roomDetail, setUserRoomId, setRoomDetail, myInfo } = userRoomStore(state => ({
    roomId: state.roomId,
    userRoomId: state.userRoomId?.data,
    roomDetail: state.roomDetail?.data,
    myInfo: state.myInfo,
    setUserRoomId: state.setUserRoomId,
    setRoomDetail: state.setRoomDetail
  }));
  const [petstatus, setPetstatus] = useState(null);

  const {
    handleStartWalk,
    handleViewCurrentLocation,
    handleEndWalk,
    handleCloseLocationModal,
    startLocation,
    currentLocation
  } = usePlantHook(status, setStatus, userRoomId, setSuccessMessage, setShowMessage, setErrorMessage, setShowError, setShowLocationModal);

  useEffect(() => {
    if (roomDetail) {
      setStatus(prevStatus => ({
        ...prevStatus,
        plantId: roomDetail?.plantSummaryResponse?.plantId ?? 0,
        level: roomDetail.plantSummaryResponse?.nowLevel ?? 0,
        exp: roomDetail.plantSummaryResponse?.nowExp ?? 0,
        walker: roomDetail.plantSummaryResponse?.userUserRoomIdOfWalker ?? 0
      }));
      handlePetStatus(roomDetail.plantSummaryResponse?.nowLevel);
    }

    setMemberList(roomDetail?.memberInfoResponses);
  }, [roomDetail]);
  
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

  function getButtonStatus () {
    if (status.walker === 0) {
      return 1;
    } else if (status.walker === userRoomId) {
      return 2;
    } else {
      return 3;
    }
  };

  const walker = memberList.find(member => member.targetUserRoomId === status.walker);
  const walkerNickname = walker?.targetNickname || '알수없음';
  const walkerProfilePicture = walker?.profilePicture || 'COW'; 

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
        <UserStatusList onMemberListUpdate={setMemberList} />
        <PetStatusList pet={petstatus} status={status} />
      </div>
      <div
        className="absolute w-5/6 bottom-20 h-20 rounded-lg flex items-center justify-center z-10 bg-gradient-to-b from-white/40 to-zinc-400/40 backdrop-blur-sm"
        style={{ boxShadow: '0px 0px 10px 0px #00000034' }}
      >
        <Question
          message={Message}
        />
        <PlantWalkButton
          buttonStatus={getButtonStatus()}
          onStartWalk={handleStartWalk}
          onViewCurrentLocation={handleViewCurrentLocation}
          onEndWalk={handleEndWalk}
        />
      </div>

      {showMessage && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-3 rounded-lg shadow-lg">
          {successMessage}
        </div>
      )}
      {showError && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-3 rounded-lg shadow-lg">
          {errorMessage}
        </div>
      )}
      {showLocationModal && startLocation && currentLocation && (
        <LocationModal
          onClose={handleCloseLocationModal}
          startLocation={startLocation}
          currentLocation={currentLocation}
          walkerNickname={walkerNickname}
          walkerProfilePicture={walkerProfilePicture}
          buttonStatus={getButtonStatus()}
          handleEndWalk={handleEndWalk}
        />
      )}
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
