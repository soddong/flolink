import ScheduleDetailModal from "./ScheduleDetailModal";
import React, { useState, useEffect } from "react";
import scheduleStore from "../../store/scheduleStore";
import ScheduleListItem from "./ScheduleListItem";

function ScheduleList ({ schedules }) {
  const [modal, setModal] = useState(false);
  const tags = scheduleStore((state) => state.tags);

  // useEffect (() => {
  //   console.log(schedules)
  //   schedules.map(schedule => {
  //     const tag = tags.find(tag => tag.value === schedule.tag)
  //     schedule.color = tag.color
  //   })
  // }, [schedules])

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
      {schedules.map((schedule) => (
        <React.Fragment key={schedule.calendarId}>
          <ScheduleListItem schedule={schedule} showScheduleDetailModal={showScheduleDetailModal} />
          {modal && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
                onClick={showScheduleDetailModal}></div>
                <ScheduleDetailModal setModal={showScheduleDetailModal} schedule={schedule} />
              </>
          )}
          <hr />
        </React.Fragment>
      ))}
    </ul>  
  )};
}

export default ScheduleList;