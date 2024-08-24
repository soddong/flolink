import Calendar from 'react-calendar';
import { useEffect, useState } from 'react';
import "../../css/calendar/Calendar.css";
import moment from "moment"
import ScheduleList from './ScheduleList';
import CreateScheduleModal from './CreateScheduleModal';
import { fetchReadSchedule } from '../../service/calendar/calendarApi';
import userRoomStore from '../../store/userRoomStore';
import { m } from 'framer-motion';
import { useCallback } from 'react';


function CalendarList () {
  const [dateValue, onDateValue] = useState(new Date())
  const [todaySchedule, setTodaySchedule] = useState([])
  const [createModal, setCreateModal] = useState(false)
  const roomId = userRoomStore((state) => state.roomId);
  const [month, setMonth] = useState(moment(dateValue).month() + 1)
  const [year, setYear] = useState(moment(dateValue).year())
  const [schedules, setSchedules] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, [month, year]);

  const fetchSchedules = async () => {
    try {
      setIsLoading(true);
      const { data } = await fetchReadSchedule({ roomId, year, month });
      setSchedules(data);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleCreateOrUpdateSchedule = async(newSchedule) => {
    try {
      setSchedules((prevSchedules) => {
        const updatedSchedules = prevSchedules.filter(
          (schedule) => schedule.calendarId !== newSchedule.calendarId
        );
        return [...updatedSchedules, newSchedule];
      });
      await fetchSchedules();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setMonth(moment(activeStartDate).month() + 1);
    setYear(moment(activeStartDate).year());
  };

  useEffect(() => {
    findSchedule(dateValue);
  }, [dateValue, schedules]);
  
  const tileClassName=({ date })=>{
    if (date.getDay() === 0) {
      return 'sunday';
    }
    if (date.getDay() === 6) {
      return 'saturday';
    }
    return '';
  }
  const tileContent = useCallback(({ date }) => {
    const schedule = schedules.filter(schedule =>
      moment(schedule.date).isSame(date, 'day')
    );
  
    return schedule.length > 0 ? (
      <div className='w-full'>
        <ul>
          {schedule.map((item, index) => (
            <li className='react-calendar__schedule' key={index}>
              {item?.title}
            </li>
          ))}
        </ul>
      </div>
    ) : null;
  }, [schedules]);

  function findSchedule (date) {
    const schedule = schedules.filter(schedule =>
      moment(schedule.date).isSame(date, 'day'),
    );
    setTodaySchedule(schedule)
  };

  function showCreateModal () {
    setCreateModal(!createModal)
  }

  return (
    <div className="w-full px-5 flex flex-col items-center text-xl"
    style={{'height': '95vh'}}>
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          Loading...
        </div>
      )}
      <Calendar onChange={onDateValue} value={dateValue}
      formatDay={(locale, date) => moment(date).format('D')}
      formatYear={(locale, date) => moment(date).format("YYYY")}
      showNeighboringMonth={false}
      calendarType="gregory"
      minDetail="year"
      tileClassName={tileClassName}
      tileContent={tileContent}
      onClickDay={findSchedule}
      onActiveStartDateChange={handleActiveStartDateChange}
      />
      <div className="w-full absolute bottom-0 bg-white rounded-t-2xl p-4 h-2/5">
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
            <CreateScheduleModal showCreateModal={showCreateModal} date={dateValue}
            title="" content="" tag="CAKE" icon="CAKE" color="#E37C91"
            onScheduleCreated={handleCreateOrUpdateSchedule}
            setIsLoading={setIsLoading} />
          </>
        )}
        <ScheduleList schedules={todaySchedule} onScheduleUpdated={handleCreateOrUpdateSchedule}
        setIsLoading={setIsLoading} />
      </div>
    </div>
  )
}

export default CalendarList;