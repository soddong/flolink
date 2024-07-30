import style from "../../css/main/main_modals.module.css"
import { useState } from "react";
import CreateCalendar from "./CreateCalendar";

function ScheduleDetailModal ({ schedule }) {
  const [modalstate, setModalstate] = useState('read')
  const [inputTitleValue, setInputTitleValue] = useState(schedule.title);
  const [inputContentValue, setInputContentValue] = useState(schedule.content);
  const [inputCalendar, setInputCalendar] = useState(false)

  function handleModalState () {
    if (modalstate === 'read') {
      setModalstate('update')
    } else {
      setModalstate('read')
    }
  }

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

  function submitSuccess (event) {
    window.alert('일정이 수정되었습니다.')
    event.preventDefault()
    setModalstate('read')
  }

  function showInputCalendar () {
    setInputCalendar(!inputCalendar)
  }

  if (modalstate === 'read') {
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
          <input type="text" maxLength={10} onChange={handleInputTitleChange}
          className="w-full rounded border-0 ring-1 ring-inset ring-gray-400 p-1"
          placeholder={schedule.title} value={inputTitleValue}/>
          <p className="flex items-center text-base mt-2 text-gray-600">
            <span className="material-symbols-outlined mt-2 mr-2" style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}>
              sell
            </span>
            {schedule.tag}
          </p>
          <p className="flex items-center text-base my-2 text-gray-600">
            <span className="material-symbols-outlined mr-2" 
            style={{'fontVariationSettings': '"FILL" 1', 'color': '#767676'}}
            onClick={showInputCalendar}>
              calendar_month
            </span>
            {schedule.date}
            {inputCalendar && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
                onClick={showInputCalendar}></div>
                <CreateCalendar setModal={showInputCalendar} schedule={schedule} />
              </>
            )}
          </p>
          <textarea type="text" maxLength={100} onChange={handleInputContentChange}
          className="w-full h-20 rounded border-0 ring-1 ring-inset ring-gray-400 p-1"
          placeholder={schedule.content} value={inputContentValue}/>
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