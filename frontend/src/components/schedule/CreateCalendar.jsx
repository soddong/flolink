import Calendar from 'react-calendar';
import { useState } from 'react';
import moment from "moment"

function CreateCalendar () {
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

  function printSchedule (date) {
    const date2 = moment(date).format('YYYY-MM-DD')
    console.log(date2)
  };

  return (
    <div className="w-full h-30 fixed inset-x-1/2 z-30 bg-rose-200"
    style={{'transform': 'translateX(-50%)'}}>
      <Calendar onChange={onDateValue} value={dateValue}
      formatDay={(locale, date) => moment(date).format('D')}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      showNeighboringMonth={false}
      calendarType="gregory"
      minDetail="year"
      tileClassName={tileClassName}
      onClickDay={printSchedule}/>
    </div>
  )
}

export default CreateCalendar;