import { useState } from "react";
import Modal from "./modalTest";

function SideBarItem (props) {
  const [modal, setModal] = useState(false);

  function handleClick() {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };
  return (
    <div className={`h-8 my-2 w-28 relative flex justify-center items-center rounded ${modal === true ? "bg-rose-400/50" : null}`} onClick={handleClick}>
      <p className="my-2 text-white text-white text-xl">{props.name}</p>
      {
        modal === true ? <Modal member={props.name} /> : null
      }
    </div>
  )
}

export default SideBarItem;