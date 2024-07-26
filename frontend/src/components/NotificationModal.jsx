import style from "../css/main_modals.module.css"
import { useState } from "react"

function NotificationModal () {
  let [count, setCount] = useState(0);

  function inputCount (event) {
    setCount(event.target.value.length)
    if (event.target.value.length > 100) {
      window.alert('100자까지 입력 가능합니다.')
    }
  }
  
  function submitSuccess () {
    window.alert('공지가 수정되었습니다.')
  }

  return (
    <div className={`w-72 h-56 backdrop-blur-sm ${style.mainModal}`}>
      <p className="text-base font-bold my-2">공지 작성하기</p>
      <form action="" onSubmit={submitSuccess}>
        <textarea maxLength={100} onChange={inputCount} placeholder="공지를 작성해주세요." className="w-64 h-36 rounded p-2 text-sm border-0 ring-1 ring-inset ring-gray-300 flex align-content-top" />
        <div className="mt-1 flex w-64 justify-between items-start">
          <p className="text-xs text-gray-500">{count}/100</p>
          <input type="submit" value="공지 업데이트" className="w-24 h-6 bg-rose-300 text-xs font-bold text-white rounded" />
        </div>
      </form>
    </div>
  )
}

export default NotificationModal;