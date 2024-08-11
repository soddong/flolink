import ScheduleDetailModal from "./ScheduleDetailModal";
import { useState } from "react";

function ScheduleList ({ schedules }) {
  const [modal, setModal] = useState(false);

  function showScheduleDetailModal () {
    setModal(!modal)
  }

  if (schedules.length === 0) {
    return (
      <div className="m-4 text-base text-gray-500">일정이 없습니다.</div>
    )
  }
  else {
    return (
    <ul>
      {schedules.map((schedule, index) => (
        <>
          <li className="flex items-center my-2" key={index}
          onClick={showScheduleDetailModal}>
            <span className="material-symbols-outlined mx-2" style={{'fontVariationSettings': '"FILL" 1', 'color': schedule.color}}>
              {schedule.icon}
            </span>
            <span className="font-bold text-lg">{schedule.title}</span>
            <span className="text-sm mx-4 text-gray-500">{schedule.date}</span>
            <button className="absolute right-8 w-9 h-6 text-xs rounded text-white" style={{'background': schedule.color}}>상세</button>
          </li>
          {modal && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
                onClick={showScheduleDetailModal}></div>
                <ScheduleDetailModal setModal={showScheduleDetailModal} schedule={schedule} />
              </>
          )}
          <hr />
        </>
      ))}
    </ul>  
  )};
}

export default ScheduleList;