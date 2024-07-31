import Calendar from 'react-calendar';
import { useState } from 'react';
import "../../css/calendar/Calendar.css";
import moment from "moment"
import ScheduleList from './ScheduleList';
import CreateScheduleModal from './CreateScheduleModal';

const schedules = [
  {
    id: 1, 
    icon: 'cake', 
    color:'#E37C91', 
    title: '엄마 생신', 
    date: '2024-07-08',
    content: '엄마 생신이니까 저녁 먹으러 집에 와!',
    tag: '생일'
  },
  {
    id: 2, 
    icon: 'bed', 
    color:'#85ABEA', 
    title: '둘째 방학', 
    date: '2024-07-17',
    content: '야호 종강이다!',
    tag: '여가'
  },
  {
    id: 3, 
    icon: 'bed', 
    color:'#85ABEA', 
    title: '둘째 방학', 
    date: '2024-06-17',
    content: '이건 가짜 데이터',
    tag: '여가'
  }
];


function CalendarList () {
  const [dateValue, onDateValue] = useState(new Date())
  const [todaySchedule, setTodaySchedule] = useState([])
  const [createModal, setCreateModal] = useState(false)
  
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
    const date2 = moment(date).format('YYYY-MM-DD')
    setTodaySchedule(schedule)
  };

  function showCreateModal () {
    setCreateModal(!createModal)
  }

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
        <button 
        className="text-xs flex items-center bg-rose-400 w-20 h-6 justify-center rounded text-white"
        onClick={showCreateModal}>
          <span className="material-symbols-outlined text-lg">
          add
          </span>
          일정 추가
        </button>
        {createModal && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showCreateModal}></div>
            <CreateScheduleModal showCreateModal={showCreateModal} date={dateValue} />
          </>
        )}
        <ScheduleList schedules={todaySchedule}/>
      </div>
    </div>
  )
}

export default CalendarList;