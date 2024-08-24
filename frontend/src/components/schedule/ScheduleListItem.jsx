import { useEffect, useState } from "react";
import scheduleStore from "../../store/scheduleStore";
import ScheduleDetailModal from "./ScheduleDetailModal";

function ScheduleListItem ({ schedule, showScheduleDetailModal, onScheduleUpdated, setIsLoading }) {
  const tags = scheduleStore((state) => state.tags);
  const [color, setColor] = useState(null)
  const [modal, setModal] = useState(false);

  function showScheduleDetailModal () {
    setModal(!modal)
  }

  useEffect(() => {
    if (schedule.tag) {

      setColor(tags.find(tag => tag.value === schedule.tag).color)
    }
  }, [schedule])
  return (
    <>
      <li onClick={showScheduleDetailModal}
      className="flex items-center my-2">
        <span className="material-symbols-outlined mx-2" style={{'fontVariationSettings': '"FILL" 1', 'color': color}}>
          {schedule.tag}
        </span>
        <span className="font-bold text-lg">{schedule.title}</span>
        <span className="text-sm mx-4 text-gray-500">{schedule.date}</span>
        <button className="absolute right-8 w-9 h-6 text-xs rounded text-white" style={{'background': color}}>상세</button>
      </li>
      {modal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
          onClick={showScheduleDetailModal}></div>
          <ScheduleDetailModal schedule={schedule} showScheduleDetailModal={showScheduleDetailModal} onScheduleUpdated={onScheduleUpdated} setIsLoading={setIsLoading}  />
        </>
      )}
    </>
  )
}

export default ScheduleListItem;