import { useState } from "react";
import Modal from "../modal/NotificationModal";

function Notification (props) {
  const [modal, setModal] = useState(false);
  const [noti, setNoti] = useState('공지를 입력해주세요')
  function showNotificationModal () {
    setModal(!modal)
  } 
  function handleNoti (data) {
    console.log(data)
    setNoti(data)
  }
  return (
    <div>
      <div className="border-box mt-4 h-20 py-2.5 px-5 bg-white/30 rounded-xl" style={{'boxShadow': '0px 0px 10px 0px #00000034'}}
      onClick={showNotificationModal}>
        <p className="text-xl mt-0.5 font-bold">📌 공지!</p>
        <p className="text-sm m-0 text-zinc-500">{noti}</p>
      </div>
      {modal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
          onClick={showNotificationModal}></div>
          <Modal content = {noti} handleNoti={handleNoti} setModal={showNotificationModal} />
        </>
      )}
    </div>
  )
}

export default Notification;