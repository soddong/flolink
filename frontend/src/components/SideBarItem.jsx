import { useState } from "react";

function SideBarItem (props) {
  return (
    <div className="h-10">
      <p className="my-2">{props.name}</p>
    </div>
  )
}

export default SideBarItem;