import FlowerModal from "./FlowerModal";
import { useState } from "react";

function Flower ({id, month, flower}) {
  const [flowerModal, setFlowerModal] = useState(false)

  function showFlowermodal () {
    setFlowerModal(!flowerModal)
  }

  return (
    <div className="flex flex-col justify-center items-center rounded-lg"
    style={{'backgroundColor': id%2 === 0 ? '#E5C2A2': null}}
    onClick={showFlowermodal}>
      <img src={flower} alt="flower_photo"
      className="w-3/5" />
      <div className="text-xs w-4/5 h-1/5 flex justify-center items-center rounded text-orange-900" 
      style={{'backgroundColor': '#D2AB86'}}>
        {month}
      </div>
      {flowerModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
          onClick={showFlowermodal}></div>
          <FlowerModal month={month} />
        </>
      )}
    </div>
  )
}

export default Flower;