import React, { useEffect, useRef, useState } from "react";
import style from '../css/main.module.css';

function Sidebar ({ width = 200, children }){
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();

  // button 클릭 시 토글
  function toggleMenu () {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  }

  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = function(event) {
    if (side.current && !side.current.contains(event.target)) {
      setX(width);
      setOpen(false);
    }
  };

  return (
    <div className={style.backgroundColorWhite}>
      <div
        ref={side}
        className={style.sidebar}
        style={{ width: `${width}px`, height: '100%', transform: `translateX(${-xPosition}px)` }}
      >
        <div onClick={toggleMenu} className={`${style.positionAbsolute} ${style.sideBar} ${style.backgroundColorWhite} ${style.width30} ${style.height95} ${style.displayFlex} ${style.alignCenter}`}>
          {isOpen ? (
            <span className="material-symbols-outlined">
              keyboard_double_arrow_left
            </span>
          ) : (
            <span class="material-symbols-outlined">
              double_arrow
            </span>
          )}
        </div>
        <div className={style.content}>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
