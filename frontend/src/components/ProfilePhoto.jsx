import Photo from '../assets/profile_dummy.jpg'
import { useState } from 'react';
import Modal from './UserStatusModal';

function ProfilePhoto (props) {
  const [modal, setModal] = useState(false);
  function showMemberModal () {
    setModal(!modal)
  }

  return (
    <div>
      <div onClick={showMemberModal}>
        <img src={Photo} alt="profile_photo" className="w-10 rounded-full" />
        <p className="text-xs m-0 text-center text-zinc-500">{props.name}</p>
      </div>
        {modal && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showMemberModal}></div>
            <Modal member={props.name}/>
          </>
        )}
    </div>
  )
}

export default ProfilePhoto;