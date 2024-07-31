import Calendar from 'react-calendar';
import { useState } from 'react';
import moment from "moment"

function CreateCalendar (props) {
  const [dateValue, onDateValue] = useState(new Date())

  const tileClassName=({ date })=>{
    if (date.getDay() === 0) {
      return 'sunday'; //
    }
    if (date.getDay() === 6) {
      return 'saturday';
    }
    return '';
  }

  function submitSchedule (date) {
    const date2 = moment(date).format('YYYY-MM-DD')
    window.alert('날짜가 수정되었습니다.')
    props.handleDate(date2);
    props.setModal();
  }

  return (
    <div className="w-full h-30 fixed inset-x-1/2 z-30 bg-stone-300 rounded"
    style={{'transform': 'translateX(-50%)'}}>
      <Calendar onChange={onDateValue} value={dateValue}
      formatDay={(locale, date) => moment(date).format('D')}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      showNeighboringMonth={false}
      calendarType="gregory"
      minDetail="year"
      tileClassName={tileClassName}
      onClickDay={submitSchedule}/>
    </div>
  )
}

export default CreateCalendar;