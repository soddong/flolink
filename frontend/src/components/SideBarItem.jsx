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
    <div className="h-10 relative" onClick={handleClick}>
      <p className="my-2">{props.name}</p>
      {
        modal === true ? <Modal member={props.name} /> : null
      }
    </div>
  )
}

export default SideBarItem;