import Photo from '../assets/profile_dummy.jpg'
import { useState } from 'react';
import Modal from './UserStatusModal';

function ProfilePhoto (props) {
  const [modal, setModal] = useState(false);
  function showNotificationModal () {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  }

  return (
    <div>
      <div onClick={showNotificationModal}>
        <img src={Photo} alt="profile_photo" className="w-10 rounded-full" />
        <p className="text-xs m-0 text-center text-zinc-500">{props.name}</p>
      </div>
        {modal === true ? 
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
          onClick={showNotificationModal}></div>
          <Modal member={props.name}/>
        </>
        : null}
    </div>
  )
}

export default ProfilePhoto;