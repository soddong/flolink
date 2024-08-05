import style from "../../css/main/main_modals.module.css"
import CreateCalendar from "./CreateCalendar"
import { useState } from "react";
import moment from "moment"
import TagSelect from "./TagSelect";

function CreateScheduleModal (props) {
  const [inputTitleValue, setInputTitleValue] = useState(props.title);
  const [inputContentValue, setInputContentValue] = useState(props.content);
  const [inputCalendar, setInputCalendar] = useState(false)
  const [date, setDate] = useState(props.date)
  const [tag, setTag] = useState(props.tag)
  const [icon, setIcon] = useState(props.icon)
  const [color, setColor] = useState(props.color)

  const nowDate = moment(date).format('YYYY-MM-DD')

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
    window.alert('일정이 수정되었습니다.')
    event.preventDefault()
    setModalstate('read')
  }

  function showInputCalendar () {
    setInputCalendar(!inputCalendar)
  }

  function handleDate (data) {
    setDate(data)
  }
  function submitSuccess (event) {
    window.alert('저장되었습니다.')
    event.preventDefault()
    props.showCreateModal()
  }
  return (
    <div className={`w-72 h-80 backdrop-blur-sm ${style.mainModal}`}>
      <span className="material-symbols-outlined absolute top-2 right-2"
        onClick={props.showCreateModal}>
          cancel
      </span>
      <h1 className="text-xl m-3 font-bold flex items-center">일정 추가</h1>
      <hr className="w-60 border-black" />
      <form action="" onSubmit={submitSuccess} className="w-full py-4 px-8 text-base">
          <div className="relative">
            <input type="text" id="title" maxLength={10} onChange={handleInputTitleChange}
            className="w-full rounded border-0 ring-1 ring-inset ring-gray-400 p-1"
            placeholder="제목을 입력하세요" value={inputTitleValue}/>
            <p className="text-xs text-gray-500 absolute right-0" style={{'bottom': '-16px'}}>{inputTitleValue.length}/10</p>
          </div>
          <p className="flex items-center text-base mt-3 text-gray-600">
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
            {nowDate}
            {inputCalendar && (
              <>
                <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
                onClick={showInputCalendar}></div>
                <CreateCalendar setModal={showInputCalendar} date={date} handleDate={handleDate} />
              </>
            )}
          </div>
          <div className="relative">
            <textarea type="text" id="content" maxLength={100} onChange={handleInputContentChange}
            className="w-full h-20 rounded border-0 ring-1 ring-inset ring-gray-400 p-2 text-sm"
            placeholder="메모를 입력하세요.." value={inputContentValue}/>
            <p className="text-xs text-gray-500 absolute"
            style={{'bottom': '-10px'}}>{inputContentValue.length}/100</p>
          </div>
          <input type="submit"
           className="w-10 h-6 rounded absolute bottom-6 right-6 bg-rose-400 text-sm text-white"
           value="저장"
           />
        </form>
    </div>
  )
}

export default CreateScheduleModal;