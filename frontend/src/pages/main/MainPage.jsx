import React, { useEffect, useState } from "react";
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
import Sidebar from "../../components/common/side_bar/SideBar";
import userRoomStore from "../../store/userRoomStore";
import usePlantHook from '../../hook/plant/plantHook'; 
import LocationModal from '../../components/main/modal/LocationModal';
import PlantWalkButton from '../../components/main/plantwalk/PlantWalkButton';
import { getNoti } from "../../service/notification/firebase";
import { questionStore } from "../../store/mainStore";
import mainStore from "../../store/mainStore";

function MainPage() {
  const [status, setStatus] = useState({ plantId: 0, level: 0, exp: 0, walker: 0 });

  const [successMessage, setSuccessMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [noti, setNoti] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const questions = questionStore((state) => state.questions)
  const {
    alarms,
    setAlarms,
  } = mainStore((state) => ({
    alarms: state?.alarms,
    setAlarms: state?.setAlarms,
  }));

  const getRandomElement = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };
  const [message, setMessage] = useState(getRandomElement());

  const { roomId, userRoomId, roomDetail, setUserRoomId, setRoomDetail, myInfo } = userRoomStore(state => ({
    roomId: state?.roomId,
    userRoomId: state?.userRoomId,
    roomDetail: state?.roomDetail?.data,
    myInfo: state?.myInfo,
    setUserRoomId: state?.setUserRoomId,
    setRoomDetail: state?.setRoomDetail
  }));
  
  const [petstatus, setPetstatus] = useState(null);
  
  const updateLevel = (newLevel) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      level: newLevel
    }));
  };

  const fetchNotificationData = async (userRoomId) => {
    try {
      const { data } = await getNoti(userRoomId);
      setAlarms(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const {
    handleStartWalk,
    handleViewCurrentLocation,
    handleEndWalk,
    handleCloseLocationModal,
    startLocation,
    currentLocation
  } = usePlantHook(status, setStatus, userRoomId?.data, setSuccessMessage, setShowMessage, setErrorMessage, setShowError, setShowLocationModal);

  useEffect(() => {
    setRoomDetail(roomId)
    if (status) {
      if (status?.level === 1) {
        setPetstatus(Pet1)
      } else if (status?.level === 2) {
        setPetstatus(Pet2)
      } else if (status?.level === 3) {
        setPetstatus(Pet3)
      } else {
        setPetstatus(Pet4)
      }
    }
  }, [roomId])

  useEffect(() => {
    if (roomDetail) { 
      setStatus(prevStatus => ({
        ...prevStatus,
        plantId: roomDetail?.plantSummaryResponse?.plantId ?? 0,
        level: roomDetail?.plantSummaryResponse?.nowLevel ?? 0,
        exp: roomDetail?.plantSummaryResponse?.nowExp ?? 0,
        walker: roomDetail?.plantSummaryResponse?.userUserRoomIdOfWalker ?? 0
      }));
      setUserRoomId(roomId)
      handlePetStatus(roomDetail?.plantSummaryResponse?.nowLevel);
      setMemberList(roomDetail?.memberInfoResponses);
      updateLevel(roomDetail?.plantSummaryResponse?.nowLevel)
      fetchNotificationData(userRoomId?.data);
    }
  }, [roomDetail, userRoomId?.data]);

  function handlePetStatus (data) {
    if (data) {
      setPetstatus(data === 1 ? Pet1 : data === 2 ? Pet2 : data === 3 ? Pet3 : Pet4);
    }
  }

  function getButtonStatus() {
    if (status?.walker === 0) {
      return 1;
    } else if (status?.walker === userRoomId?.data) {
      return 2;
    } else {
      return 3;
    }
  };

  const walker = memberList.find(member => member?.targetUserRoomId === status?.walker);
  const walkerNickname = walker?.targetNickname || '알수없음';
  const walkerProfilePicture = walker?.profile || 'COW';

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <div className="py-7 w-5/6">
        <header className="flex justify-between">
          <h1 className="m-0 font-bold text-2xl text-rose-500">
            {roomDetail?.roomSummarizeResponse?.roomName}
          </h1>
          <AlarmModal noti={alarms} />
        </header>
        <Notification notice={roomDetail?.roomSummarizeResponse?.notice} />
        <UserStatusList onMemberListUpdate={setMemberList} />
        <PetStatusList pet={petstatus} status={status} />
      </div>
      
      <div
        className="absolute w-5/6 bottom-20 h-20 rounded-lg flex items-center justify-center z-10 bg-gradient-to-b from-white/40 to-zinc-400/40 backdrop-blur-md"
        style={{ boxShadow: '0px 0px 10px 0px #00000034' }}
      >
        <Question
          message={message.content}
        />
        <PlantWalkButton
          buttonStatus={getButtonStatus()}
          onStartWalk={handleStartWalk}
          onViewCurrentLocation={handleViewCurrentLocation}
          onEndWalk={handleEndWalk}
          walkerNickname={walkerNickname}
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
    </div>
  );
}

export default MainPage;
