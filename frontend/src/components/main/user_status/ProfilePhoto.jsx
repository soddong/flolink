import { useEffect, useState } from 'react';
import Modal from '../modal/UserStatusModal';
import { updateRoomMemberNickname } from '../../../service/userroom/userroomApi.js';
import userRoomStore from "../../../store/userRoomStore.js"

function ProfilePhoto({ name, photo, status, targetUserRoomId, manager }) {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(name)
  const roomId = userRoomStore((state) => state.roomId);

  function showMemberModal() {
    setModal(!modal)
  }

  function handleUsername(data) {
    setUsername(data);
    updateRoomMemberNickname({
      targetNickname: data,
      roomId,
      targetUserRoomId: targetUserRoomId,
    })
    .then(({ data }) => {
      console.log({ data });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    setUsername(name)
  },[])

  return (
    <div>
      <div onClick={showMemberModal}>
        <img src={photo} alt="profile_photo" className="w-10 rounded-full" />
        <p className="text-xs m-0 text-center text-zinc-500">{username}</p>
      </div>
      {modal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showMemberModal}></div>
          <Modal name={name} photo={photo} status={status} targetUserRoomId={targetUserRoomId} manager={manager} username={username} handleUsername={handleUsername} />
        </>
      )}
    </div>
  )
}

export default ProfilePhoto;