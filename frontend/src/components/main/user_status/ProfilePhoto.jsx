import { useState } from 'react';
import Modal from '../modal/UserStatusModal';

function ProfilePhoto({ name, photo, status, targetUserRoomId, manager }) {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(name)

  function showMemberModal() {
    setModal(!modal)
  }

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
          <Modal name={name} photo={photo} status={status} targetUserRoomId={targetUserRoomId} manager={manager} username={username} setUsername={setUsername} />
        </>
      )}
    </div>
  )
}

export default ProfilePhoto;