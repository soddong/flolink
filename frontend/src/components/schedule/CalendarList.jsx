import Calendar from 'react-calendar';
import { useState } from 'react';
import "../../css/calendar/Calendar.css";
import moment from "moment"

const ValuePiece = Date | null;

const Value = ValuePiece | [ValuePiece, ValuePiece];


function CalendarList () {
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
  return (
    <div  className="w-full h-72 px-5 flex flex-col items-center text-xl font-bold">
      <Calendar onChange={onDateValue} value={dateValue}
      formatDay={(locale, date) => moment(date).format('D')}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      showNeighboringMonth={false}
      calendarType="gregory"
      minDetail="year"
      tileClassName={tileClassName}/>
    </div>
  )
}

export default CalendarList;

{/* <div className="w-full h-72 px-5 flex flex-col items-center text-xl text-white font-bold">
      <div className="w-32 h-6 flex mb-2 justify-between">
        <span className="material-symbols-outlined leading-7">
          keyboard_arrow_left
        </span>
        7월
        <span className="material-symbols-outlined leading-7">
          keyboard_arrow_right
        </span>
      </div>
      <div className="w-full h-5 my-2 flex justify-between">
        <div className="text-center w-12 text-lg text-red-500">
          Sun
        </div>
        <div className="text-center w-12 text-lg text-zinc-500">
          Mon
        </div>
        <div className="text-center w-12 text-lg text-zinc-500">
          Tue
        </div>
        <div className="text-center w-12 text-lg text-zinc-500">
          Wed
        </div>
        <div className="text-center w-12 text-lg text-zinc-500">
          Thu
        </div>
        <div className="text-center w-12 text-lg text-zinc-500">
          Fri
        </div>
        <div className="text-center w-12 text-lg text-blue-500">
          Sat
        </div>
      </div>
      <hr className="w-full border"/>
    </div> */}