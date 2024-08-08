import CardforChannelSelect from "../../components/channel_select/CardforChannelSelect";
import AddNewChannelCard from "../../components/channel_select/AddNewChannelCard";
import styles from "../../css/channel_select/channelselect.module.css";
import { useState, useRef, useEffect } from "react";

import Logo from "../../assets/logo/flolink_logo.png";
import UserAvatar from "../../assets/profile/profile_dummy.jpg";
import ModalforChannelSelect from "../../components/channel_select/ModalforChannelSelect";
import { getMyUserRooms, getMyInfoinChannelSelect } from "../../service/userroom/userroomApi";
import { useNavigate } from "react-router-dom";

function ChannelSelectPage() {
  const navigate = useNavigate();
  const [family, setFamily] = useState([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [channelStatus, setChannelStatus] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  useEffect(() => {
    setFamily([]);
    getMyUserRooms()
      .then(({ data }) => {
        data?.forEach((element) => {
          setFamily((prevFamilies) => [
            ...prevFamilies,
            {
              roomId: element.roomId,
              title: element.roomName,
              familySize: element.userCount,
            },
          ]);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
    } else {
      dropdownRef.current.style.maxHeight = "0px";
    }
  }, [isDropdownOpen]);

  const handleAddNewChannel = () => {
    setIsModalOpen(true);
    setChannelStatus("선택");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChannelStatus(null);
  };

  const handleCreateFamily = () => {
    setChannelStatus("생성");
  };

  const handleJoinFamily = () => {
    setChannelStatus("추가");
  };

  return (
    <div className={`${styles.startforselect} bg-custom-gradient`}>
      <div className={styles.headerforselect}>
        <div className={`${styles.cardforuserinfo}`}>
          <div
            className="flex items-center cursor-pointer relative"
            onClick={toggleDropdown}
          >
            <img
              src={UserAvatar}
              alt="User Avatar"
              className="w-12 h-12 rounded-full"
            />
            <span className="ml-2.5 text-black font-semibold">OOO님</span>
            <div
              ref={dropdownRef}
              className={`${styles.dropdown} absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out`}
            >
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  마이 룸 이동
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  비밀번호 변경
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  로그아웃
                </li>
                <li className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer">
                  회원탈퇴
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
            ) : index === family.length && family.length < 4 ? (
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
    </div>
  );
}
export default ChannelSelectPage;
