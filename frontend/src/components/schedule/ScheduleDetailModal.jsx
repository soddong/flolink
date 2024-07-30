import style from "../../css/main/main_modals.module.css"

function ScheduleDetailModal ({ schedule }) {
  return (
    <div className={`w-72 h-80 backdrop-blur-sm ${style.mainModal}`}>
      <h1 className="text-xl m-3 font-bold flex items-center">일정 상세
        <span className="material-symbols-outlined mx-1" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
          delete
        </span>
      </h1>
      <hr className="w-60 border-black" />
      <div className="w-full py-4 px-8">
        <p className="text-lg font-bold">{schedule.title}</p>
        <p className="flex items-center text-base mt-4 text-gray-600">
          <span className="material-symbols-outlined mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
            sell
          </span>
          {schedule.tag}
        </p>
        <p className="flex items-center text-base mt-4 text-gray-600">
          <span className="material-symbols-outlined mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
            calendar_month
          </span>
          {schedule.date}
        </p>
      </div>
      <hr className="w-60 border-black" />
      <p className="w-full py-4 px-8 text-base text-gray-600">{schedule.content}</p>
      <button className="w-10 h-6 rounded absolute bottom-6 right-6 bg-rose-400 text-sm text-white">수정</button>
    </div>
  )
}

export default ScheduleDetailModal;