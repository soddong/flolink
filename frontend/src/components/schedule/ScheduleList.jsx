import ScheduleDetailModal from "./ScheduleDetailModal";
import React, { useState, useEffect } from "react";
import ScheduleListItem from "./ScheduleListItem";

function ScheduleList ({ schedules, onScheduleUpdated, setIsLoading }) {

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
          <ScheduleListItem schedule={schedule} onScheduleUpdated={onScheduleUpdated}
          setIsLoading={setIsLoading} />
          <hr />
        </React.Fragment>
      ))}
    </ul>  
  )};
}

export default ScheduleList;