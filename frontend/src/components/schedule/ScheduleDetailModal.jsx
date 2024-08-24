import style from "../../css/main/main_modals.module.css"
import { useEffect, useState } from "react";
import CreateCalendar from "./CreateCalendar";
import WarningModal from "../main/modal/WarningModal";
import TagSelect from "./TagSelect";
import scheduleStore from "../../store/scheduleStore";
import { fetchUpdateSchedule } from "../../service/calendar/calendarApi";
import userRoomStore from "../../store/userRoomStore";

function ScheduleDetailModal ({ showScheduleDetailModal, schedule, onScheduleUpdated, setIsLoading }) {
  const tags = scheduleStore((state) => state.tags);
  const [modalstate, setModalstate] = useState('read')
  const [inputTitleValue, setInputTitleValue] = useState(schedule.title);
  const [inputContentValue, setInputContentValue] = useState(schedule.content);
  const [inputCalendar, setInputCalendar] = useState(false)
  const [date, setDate] = useState(schedule.date)
  const [tag, setTag] = useState(schedule.tag)
  const [icon, setIcon] = useState(schedule.icon)
  const [color, setColor] = useState(schedule.color)
  const [warning, setWarning] = useState(false)
  const [tagDetail, setTagDetail] = useState(null)
  const roomId = userRoomStore((state) => state.roomId)

  function handleModalState () {
    if (modalstate === 'read') {
      setModalstate('update')
    } else {
      setModalstate('read')
    }
  }

  useEffect(() => {
    setTagDetail(tags.find(tag => tag.value === schedule.tag))
  }, [schedule])

  function handleInputTitleChange (event) {
    setInputTitleValue(event.target.value)
    if (event.target.value.length > 10) {
      window.alert('10자까지 입력 가능합니다.')
    }
  }

  function handleInputContentChange (event) {
    setInputContentValue(event.target.value)
    if (event.target.value.length > 100) {
      window.alert('100자까지 입력 가능합니다.')
    }
  }

  function handleInputTagChange (data) {
    setTag(data)
  }

  function handleIconChange(data) {
    setIcon(data)
  }

  function handleColorChange(data) {
    setColor(data)
  }

  function submitSuccess (event) {
    setIsLoading(true)
    event.preventDefault()
    fetchUpdateSchedule({
      calendarId: schedule?.calendarId,
      roomId,
      title: inputTitleValue,
      tag: icon,
      date,
      content: inputContentValue
    })
    .then(({data}) => {
      window.alert('일정이 수정되었습니다.')
      setModalstate('read')
      onScheduleUpdated(data)
    })
    .catch((e) => {
      console.log(e)
    })
  }

  function showInputCalendar () {
    setInputCalendar(!inputCalendar)
  }

  function handleDate (data) {
    setDate(data)
  }

  function showWarning () {
    setWarning(!warning)
  }

  if (modalstate === 'read') {
    return (
      <div className={`w-72 h-80 backdrop-blur-sm ${style.mainModal}`}>
        <span className="material-symbols-outlined absolute top-2 right-2"
        onClick={showScheduleDetailModal}>
          cancel
        </span>
        <h1 className="text-xl m-3 font-bold flex items-center">일정 상세
          <span className="material-symbols-outlined mx-1" 
          style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}
          onClick={showWarning}>
            delete
          </span>
        </h1>
        {warning && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showWarning}></div>
            <WarningModal showWarning={showWarning} showScheduleDetailModal={showScheduleDetailModal} schedule={schedule} />
          </>
        )}
        <hr className="w-60 border-black" />
        <div className="w-full py-4 px-8">
          <p className="text-lg font-bold">{inputTitleValue}</p>
          <p className="flex items-center text-base mt-4 text-gray-600">
            <span className="material-symbols-outlined mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': color}}>
              {tag}
            </span>
            {tagDetail && tagDetail.name}
          </p>
          <p className="flex items-center text-base mt-4 text-gray-600">
            <span className="material-symbols-outlined mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
              calendar_month
            </span>
            {date}
          </p>
        </div>
        <hr className="w-60 border-black" />
        <p className="w-full py-4 px-8 text-base text-gray-600">{inputContentValue}</p>
        <button className="w-10 h-6 rounded absolute bottom-6 right-6 bg-rose-400 text-sm text-white"
        onClick={handleModalState}>수정</button>
      </div>
    )
  }
  else {
    return(
      <div className={`w-72 h-80 backdrop-blur-sm ${style.mainModal}`}>
        <h1 className="text-xl m-3 font-bold flex items-center">일정 수정</h1>
        <hr className="w-60 border-black" />
        <form action="" onSubmit={submitSuccess} className="w-full py-4 px-8 text-base">
          <div className="relative">
            <input type="text" id="title" maxLength={10} onChange={handleInputTitleChange}
            className="w-full rounded border-0 ring-1 ring-inset ring-gray-400 p-1"
            placeholder={schedule.title} value={inputTitleValue}/>
            <p className="text-xs text-gray-500 absolute right-0" style={{'bottom': '-16px'}}>{inputTitleValue.length}/10</p>
          </div>
          <p className="flex items-center text-base mt-2 text-gray-600">
            <span className="material-symbols-outlined mt-2 mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
              sell
            </span>
            <TagSelect value={tag} handleInputTagChange={handleInputTagChange} handleIconChange={handleIconChange} handleColorChange={handleColorChange}/>
          </p>
          <div className="flex items-center text-base my-2 text-gray-600">
            <span className="material-symbols-outlined mr-2" 
            style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}
            onClick={showInputCalendar}>
              calendar_month
            </span>
            {date}
            {inputCalendar && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
                onClick={showInputCalendar}></div>
                <CreateCalendar setModal={showInputCalendar} date={date} handleDate={handleDate} />
              </>
            )}
          </div>
          <textarea type="text" id="content" maxLength={100} onChange={handleInputContentChange}
          className="w-full h-20 rounded border-0 ring-1 ring-inset ring-gray-400 p-2 text-sm"
          placeholder={schedule.content} value={inputContentValue}/>
          <p className="text-xs text-gray-500">{inputContentValue.length}/100</p>
          <input type="submit"
           className="w-10 h-6 rounded absolute bottom-6 right-6 bg-rose-400 text-sm text-white"
           value="저장"
           />
        </form>
      </div>
    )
  }
}

export default ScheduleDetailModal;