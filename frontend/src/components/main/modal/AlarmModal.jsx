import { useState, useRef, useEffect } from "react"
import style from '../../../css/channel_select/channelselect.module.css'
import mainStore from "../../../store/mainStore";

function AlarmModal ({ noti }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isRead, setIsRead] = useState(true);
  const { alarms, readAlarms, setAlarms, addReadAlarm, markAllAlarmsAsRead } = mainStore();

  useEffect(() => {
    if (noti?.length > 0) {
      const newAlarms = noti?.filter(item => !readAlarms.includes(item.id));

      if (newAlarms.length > 0) {
        setIsRead(false);
        setAlarms(noti);
      } else {
        setIsRead(true);
      }
    } else {
      setIsRead(true);
    }
  }, [noti, readAlarms]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);

    if (!isDropdownOpen) {
      markAllAlarmsAsRead();
      setIsRead(true);
    }
    if (noti?.length > 0) {
      noti.forEach(alarm => {
          if (!readAlarms.includes(alarm.id)) {
              addReadAlarm(alarm.id);
          }
      });
  }
  };

  const unreadAlarms = alarms?.filter(alarm => !readAlarms.includes(alarm.id)) || [];

  useEffect(() => {
      if (isDropdownOpen) {
          dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
      } else {
          dropdownRef.current.style.maxHeight = '0px';
      }
  }, [isDropdownOpen, noti]);

  return (
    <>
      <button className="relative w-8 h-8 bg-rose-400 rounded flex justify-center items-center"
      onClick={toggleDropdown}>
        {unreadAlarms?.length > 0 && !isRead &&
        <>
          <div className="animate-ping absolute -right-1 -top-1 w-3 h-3 bg-red-700 rounded-full"></div>
          <div className="absolute -right-1 -top-1 w-3 h-3 bg-red-700 rounded-full"></div>
        </>
        }
        <span className="material-symbols-outlined text-white" style={{'fontVariationSettings': '"FILL" 1'}}>
          notifications
        </span>
        <div ref={dropdownRef}
        className={`${style.dropdown} absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out`}>
          <ul role="list" className="w-full py-1">
            {noti?.length > 0 && noti?.map((item, index) => (
              <li className="w-full hover:bg-gray-100" key={index}>
                <p className="w-full whitespace-pre-line text-left">{item?.message}</p>
                <hr className="mt-1" />
              </li>
            ))}
          </ul>
        </div>
      </button>
    </>
  )
}

export default AlarmModal;