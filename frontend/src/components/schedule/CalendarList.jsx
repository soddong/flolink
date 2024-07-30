import Calendar from 'react-calendar';
import { useState } from 'react';
import "../../css/calendar/Calendar.css";
import moment from "moment"
import ScheduleList from './ScheduleList';

const schedules = [
  {id: 1, icon: 'cake', color:'#E37C91', title: '엄마 생신', date: '2024-07-08'},
  {id: 2, icon: 'bed', color:'#85ABEA', title: '둘째 방학', date: '2024-07-17'}
];


function CalendarList () {
  const [dateValue, onDateValue] = useState(new Date())
  const [todaySchedule, setTodaySchedule] = useState([])
  
  const tileClassName=({ date })=>{
    if (date.getDay() === 0) {
      return 'sunday'; //
    }
    if (date.getDay() === 6) {
      return 'saturday';
    }
    return '';
  }

  const tileContent = ({ date }) => {
    const schedule = schedules.find(schedule => 
      moment(schedule.date).isSame(date, 'day'),
    );
    return schedule ? <div className="react-calendar__schedule">{schedule.title}</div> : null;
  };

  function findSchedule (date) {
    const schedule = schedules.filter(schedule =>
      moment(schedule.date).isSame(date, 'day'),
    );
    setTodaySchedule(schedule)
  };

  return (
    <div  className="w-full px-5 flex flex-col items-center text-xl"
    style={{'height': '95vh'}}>
      <Calendar onChange={onDateValue} value={dateValue}
      formatDay={(locale, date) => moment(date).format('D')}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      showNeighboringMonth={false}
      calendarType="gregory"
      minDetail="year"
      tileClassName={tileClassName}
      tileContent={tileContent}
      onClickDay={findSchedule}
      />
      <div className="w-full absolute bottom-0 bg-white rounded-t-2xl p-4" style={{'height': '40vh'}}>
        <hr className="w-10 absolute top-2 left-1/2 translate-x-3/4 border-slate-600 border-2 rounded"
        style={{'transform': 'translateX(-50%)'}}/>
        <button className="text-xs flex items-center bg-rose-400 w-20 h-6 justify-center rounded text-white">
          <span className="material-symbols-outlined text-lg">
          add
          </span>
          일정 추가
        </button>
        <ScheduleList schedules={todaySchedule}/>
      </div>
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