import CardforChannelSelect from "../../components/channel_select/CardforChannelSelect";
import AddNewChannelCard from "../../components/channel_select/AddNewChannelCard";
import NotificationModalforChannelSelect from '../../components/channel_select/NotificationModalforChannelSelect';
import styles from "../../css/channel_select/channelselect.module.css";
import { useState, useRef, useEffect } from "react";

import Logo from "../../assets/logo/logo.png";
import ModalforChannelSelect from "../../components/channel_select/ModalforChannelSelect";
import { getMyUserRooms, getMyInfoinChannelSelect } from "../../service/userroom/userroomApi";
import { useNavigate } from "react-router-dom";
import { logout } from '../../service/user/userApi';
import { requestPermissionAndGetToken, sendTokenToServer } from "../../service/notification/firebase";
import { getMyInfo } from "../../service/user/userApi";

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

function ChannelSelectPage() {
  const navigate = useNavigate();
  const [family, setFamily] = useState([]);
  const [usernickname, setUserNickname] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [channelStatus, setChannelStatus] = useState(null);
  const [myInfo, setMyInfo] = useState(null)
  const [isNotified, setIsNotified] = useState(true)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const myInfoResponse = await getMyInfo();
        setMyInfo(myInfoResponse.data);

        setFamily([]); 

        const userRoomsResponse = await getMyUserRooms();
        const familyData = userRoomsResponse.data.map(element => ({
          roomId: element?.roomId,
          title: element?.roomName,
          familySize: element?.userCount,
        }));

        setFamily(familyData); 

        if ('Notification' in window) {
          if (Notification.permission === 'granted') {
            // 승인된 경우
          } else if (Notification.permission === 'denied') {
            setIsNotified(false);
            // 거부된 경우
          } else {
            setIsNotified(false);
            // 요청되지 않은 경우
          }
        } else {
          setIsNotified(false);
          // 요청되지 않은 경우 (Notification API를 지원하지 않는 브라우저)
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData(); 
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
    } else {
      dropdownRef.current.style.maxHeight = "0px";
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
        await logout();
        navigate('/');
    }
    catch (error) {
        console.log(error)
    }
}

  const handleAddNewChannel = () => {
    setIsModalOpen(true);
    setChannelStatus("선택");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChannelStatus(null);
  };

  const handleCloseNotiModal = () => {
    setIsNotified(!isNotified);
  }

  const handleCreateFamily = () => {
    setChannelStatus("생성");
  };

  const handleJoinFamily = () => {
    setChannelStatus("추가");
  };

  const handleNotificationAllow = async () =>{
    const token = await requestPermissionAndGetToken();
    if(token){
      sendTokenToServer(token);
    }
    handleCloseNotiModal();
  }
  
  return (
    <div className={`${styles.startforselect} bg-custom-gradient`}>
      <div className={styles.headerforselect}>
        <button className={styles.alarmButton} onClick={handleNotificationAllow}>
          <NotificationsNoneIcon className={styles.bellIcon} />
        </button>
        <div className={`${styles.cardforuserinfo}`}>
          <div
            className="flex items-center cursor-pointer relative"
            onClick={toggleDropdown}
          >
            {myInfo?.emotion === "HAPPY" ?
            <img src={import.meta.env.BASE_URL + 'profile/' + myInfo?.profile?.toLowerCase() + '.png'}
            alt="profile_image" className="w-12 h-12 rounded-full" /> :
            <img src={import.meta.env.BASE_URL + 'profile/' + myInfo?.profile?.toLowerCase() + '_' + myInfo?.emotion?.toLowerCase() + '.png'}
            alt="profile_image" className="w-12 h-12 rounded-full" />
            }
            <span className="ml-2.5 text-black font-semibold">{myInfo?.nickname}님</span>
            <div
              ref={dropdownRef}
              className={`${styles.dropdown} absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/setting")}>
                  설정
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/PwReset")}>
                  비밀번호 변경
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}>
                  로그아웃
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.logo}>
        <img src={Logo} />
      </div>
      <div className={styles.cardContainerforselect}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.cardWrapper}>
            {family[index] ? (
              <CardforChannelSelect family={family[index]} 
              />
            ) : index === family?.length && family?.length < 4 ? (
              <AddNewChannelCard onClick={handleAddNewChannel} />
            ) : null}
          </div>
        ))}
      </div>
      <ModalforChannelSelect
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreateFamily={handleCreateFamily}
        onJoinFamily={handleJoinFamily}
        channelStatus={channelStatus}
        setFamily={setFamily}
      />
      <NotificationModalforChannelSelect 
        isOpen={!isNotified}
        onClose={handleCloseNotiModal}
        handleNotification = {handleNotificationAllow}
      />
    </div>
  );
}
export default ChannelSelectPage;
