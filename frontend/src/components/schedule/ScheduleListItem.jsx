import { useEffect, useState } from "react";
import scheduleStore from "../../store/scheduleStore";

function ScheduleListItem ({ schedule, showScheduleDetailModal }) {
  const tags = scheduleStore((state) => state.tags);
  const [color, setColor] = useState(null)

  useEffect(() => {
    if (schedule.tag) {

      setColor(tags.find(tag => tag.value === schedule.tag).color)
    }
    console.log(color)
  }, [schedule])
  return (
    <li onClick={showScheduleDetailModal}
     className="flex items-center my-2">
      <span className="material-symbols-outlined mx-2" style={{'fontVariationSettings': '"FILL" 1', 'color': color}}>
        {schedule.tag}
      </span>
      <span className="font-bold text-lg">{schedule.title}</span>
      <span className="text-sm mx-4 text-gray-500">{schedule.date}</span>
      <button className="absolute right-8 w-9 h-6 text-xs rounded text-white" style={{'background': color}}>상세</button>
    </li>
  )
}

export default ScheduleListItem;