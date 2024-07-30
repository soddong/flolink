function ScheduleList ({ schedules }) {
  if (schedules.length === 0) {
    return (
      <div className="m-4 text-base text-gray-500">일정이 없습니다.</div>
    )
  }
  else {
    return (
    <ul>
      {schedules.map(schedule => (
        <>
          <li className="flex items-center my-2" key={schedule.id}>
            <span className="material-symbols-outlined mx-2" style={{'fontVariationSettings': '"FILL" 1', 'color': schedule.color}}>
              {schedule.icon}
            </span>
            <span className="font-bold text-lg">{schedule.title}</span>
            <span className="text-sm mx-4 text-gray-500">{schedule.date}</span>
            <button className="absolute right-8 w-9 h-6 text-xs rounded text-white" style={{'background': schedule.color}}>수정</button>
          </li>
          <hr />
        </>
      ))}
    </ul>
  )};
}

export default ScheduleList;