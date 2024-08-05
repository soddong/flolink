import { useState, useRef } from "react";
import Modal from "../../main/modal/memberItemModal";

function SideBarItem (props) {
  const [modal, setModal] = useState(false);
  const modalRef = useRef();

  function showMemberModal(event) {
    setModal(!modal)
    console.log(event.target)
  };

  return (
    <div className={`h-8 my-2 w-28 relative flex justify-center items-center rounded ${modal === true ? "bg-rose-400/50" : null}`}>
    <p className="my-2 text-white text-white text-xl" onClick={showMemberModal}>{props.name}</p>
    {modal && (
      <>
        <div className="fixed top-0 left-0 w-screen h-full bg-zinc-800/50 z-20"
           onClick={showMemberModal}></div>
        <Modal member={props.name} />
      </>
    )}
  </div>
  )
}

export default SideBarItem;