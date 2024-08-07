import React, { useState } from "react";
import styles from "../../css/channel_select/modalforchannelselect.module.css";
import { useEffect, useRef } from "react";
import {
  createUserRoom,
  registerUserRoom,
} from "../../service/userroom/userroomApi";
import { useNavigate } from "react-router-dom";

function ModalforChannelSelect({
  isOpen,
  onClose,
  onCreateFamily,
  onJoinFamily,
  channelStatus,
  setFamily,
}) {
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const [roomCreateRequest, setRoomCreateRequest] = useState({
    roomName: "",
    roomParticipatePassword: "",
  });
  const [roomParticipateRequest, setRoomParticipateRequest] = useState({
    roomId: null,
    roomParticipatePassword: "",
  });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const handleCreateUserRoom = () => {
    createUserRoom({
      roomName: roomCreateRequest.roomName,
      roomParticipatePassword: roomCreateRequest.roomParticipatePassword,
    }).then(({ data }) => {
      setFamily((prevFamilies) => [
        ...prevFamilies,
        {
          roomId: data.roomId,
          title: data.roomName,
          familySize: data.userCouont,
        },
      ]);
      onClose();
    });
  };
  const handleRegisterUserRoom = () => {
    registerUserRoom({
      roomId: roomParticipateRequest.roomId,
      roomParticipatePassword: roomParticipateRequest.roomParticipatePassword,
    }).then(({ data }) => {
      setFamily((prevFamilies) => [
        ...prevFamilies,
        {
          title: data.roomName,
          familySize: data.userCount,
          roomId: data.roomId
        },
      ]);
      onClose();
    });
  };

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        {channelStatus === "선택" && (
          <>
            <h2 className={styles.modalTitle}>가족 선택</h2>
            <button className={styles.modalButton} onClick={onCreateFamily}>
              가족 생성
            </button>
            <button className={styles.modalButton} onClick={onJoinFamily}>
              가족 추가
            </button>
          </>
        )}
        {channelStatus === "생성" && (
          <>
            <h2 className={styles.modalTitle}>가족 생성</h2>
            <h3>가족방 이름</h3>
            <input
              value={roomCreateRequest.roomName}
              placeholder="여기에 입력"
              onChange={(e) => {
                setRoomCreateRequest((prev) => ({
                  ...prev,
                  roomName: e.target.value,
                }));
              }}
            ></input>
            <h3>비밀번호</h3>
            <input
              value={roomCreateRequest.roomParticipatePassword}
              name="patternValue"
              placeholder="000000"
              pattern="\d{6}"
              required
              onChange={(e) => {
                setRoomCreateRequest((prev) => ({
                  ...prev,
                  roomParticipatePassword: e.target.value,
                }));
              }}
            ></input>
            <button onClick={handleCreateUserRoom}>가족 생성</button>
          </>
        )}
        {channelStatus === "추가" && (
          <>
            <h2 className={styles.modalTitle}>가족 추가</h2>
            <h3>가족방 번호</h3>
            <input
              value={roomParticipateRequest.roomId}
              placeholder="여기에 입력"
              required
              onChange={(e) =>
                setRoomParticipateRequest((prev) => ({
                  ...prev,
                  roomId: e.target.value,
                }))
              }
            ></input>
            <h3>비밀번호</h3>
            <input
              value={roomParticipateRequest.roomParticipatePassword}
              name="patternValue"
              pattern="\d{6}"
              placeholder="000000"
              required
              onChange={(e) =>
                setRoomParticipateRequest((prev) => ({
                  ...prev,
                  roomParticipatePassword: e.target.value,
                }))
              }
            ></input>
            <button onClick={handleRegisterUserRoom}>가족 입장</button>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalforChannelSelect;
