import { useEffect, useState } from 'react';
import Modal from '../modal/UserStatusModal';
import { updateRoomMemberNickname } from '../../../service/userroom/userroomApi.js';
import userRoomStore from "../../../store/userRoomStore.js"

function ProfilePhoto({ member }) {
  const [modal, setModal] = useState(false);
  const [username, setUsername] = useState(member?.targetNickname)
  const roomId = userRoomStore((state) => state?.roomId);

  function showMemberModal() {
    setModal(!modal)
  }

  function handleUsername(data) {
    setUsername(data);
    updateRoomMemberNickname({
      targetNickname: data,
      roomId,
      targetUserRoomId: member?.targetUserRoomId,
    })
    .then(({ data }) => {
      console.log({ data });
    })
    .catch((e) => {
      console.log(e);
    });
  }

  useEffect(() => {
    setUsername(member?.targetNickname)
  },[member])
  
  return (
    <div className='w-16 shrink-0'>
      <div onClick={showMemberModal} className='w-14 flex flex-col items-center'>
        {member?.emotion === "HAPPY" ? 
          <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '.png'}
          alt="profile_photo" className="w-10 h-10 rounded-full" />
         : 
          <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '_' + member?.emotion?.toLowerCase() + '.png'}
         alt="profile_photo" className="w-10 h-10 rounded-full" />
        }
        
        <p className="w-full text-xs m-0 text-center text-zinc-500 truncate">{username}</p>
      </div>
      {modal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showMemberModal}></div>
          <Modal member={member} username={username} handleUsername={handleUsername} />
        </>
      )}
    </div>
  )
}

export default ProfilePhoto;