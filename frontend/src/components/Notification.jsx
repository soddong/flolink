import { useState } from "react";
import Modal from "./NotificationModal";

function Notification (props) {
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
      <div className="border-box mt-4 h-20 py-2.5 px-5 bg-white/30 rounded-xl" style={{'boxShadow': '0px 0px 10px 0px #00000034'}}
      onClick={showNotificationModal}>
        <p className="text-xl mt-0.5 font-bold">📌 공지!</p>
        <p className="text-sm m-0 text-zinc-500">{props.message}</p>
      </div>
      {modal === true ? 
      <>
        <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"></div>
        <Modal />
      </>
       : null}
    </div>
  )
}

export default Notification;