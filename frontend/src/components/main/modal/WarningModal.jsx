import style from "../../../css/main/main_modals.module.css"
import userRoomStore from "../../../store/userRoomStore"
import { fetchDeleteSchedule } from "../../../service/calendar/calendarApi";

function WarningModal (props) {
  const roomId = userRoomStore((state) => state.roomId);
  function deleteSuccess () {
    window.alert('일정이 삭제되었습니다.')
    props.showWarning()
    props.showScheduleDetailModal()
    fetchDeleteSchedule(props.schedule.calendarId, roomId)
    setTimeout(() => {
      window.location.reload();
    }, 500)
  }

  return (
    <div className={`${style.warningModal}`}>
      <p className="text-sm m-2">해당 일정을 정말 삭제하시겠습니까?</p>
      <div className="flex w-24 justify-between">
        <button className="w-10 h-6 text-sm bg-rose-400 text-white rounded"
        onClick={props.showWarning}>
          취소
        </button>
        <button className="w-10 h-6 text-sm bg-blue-400 text-white rounded"
        onClick={deleteSuccess}>
          삭제
        </button>
      </div>
    </div>
  )
}

export default WarningModal;