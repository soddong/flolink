import { useState, useRef, useEffect } from "react"
import style from '../../../css/channel_select/channelselect.module.css'

function AlarmModal () {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
      if (isDropdownOpen) {
          dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
      } else {
          dropdownRef.current.style.maxHeight = '0px';
      }
  }, [isDropdownOpen]);

  const alarms = [
    {id: 1, content: '엄마 님이 좋아요를 눌렀습니다.', isRead: 0},
    {id: 2, content: '공지가 변경되었습니다.', isRead: 0}
  ]

  return (
    <>
      <button className="relative w-8 h-8 bg-rose-400 rounded flex justify-center items-center"
      onClick={toggleDropdown}>
        <span className="material-symbols-outlined text-white" style={{'fontVariationSettings': '"FILL" 1'}}>
          notifications
        </span>
        <div ref={dropdownRef}
        className={`${style.dropdown} absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-10 overflow-hidden transition-all duration-300 ease-in-out`}>
          <ul className="py-1">
            {alarms.map(alarm => (
              <li className="hover:bg-gray-100 flex items-center" key={alarm.id}>
                {!alarm.isRead && (
                  <div className="w-2 h-2 mr-2 rounded bg-rose-500"></div>
                )}
                {alarm.content}
              </li>
            ))}
          </ul>
        </div>
      </button>
    </>
  )
}

export default AlarmModal;