import React, { useEffect, useRef, useState } from "react";
import style from '../css/side_bar.module.css';
import logo from '../assets/logo.png';
import SideBarItem from "./SideBarItem";


function Sidebar ({ width = 150, children }){
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();
  const FamilyMembers = ['엄마', '아빠', '첫째', '둘째']

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

  // // 사이드바 외부 클릭시 닫히는 함수
  // const handleClose = function(event) {
  //   if (side.current && !side.current.contains(event.target)) {
  //     setX(width);
  //     setOpen(false);
  //   }
  // };

  return (
    <div className="bg-white">
      <div
        ref={side}
        className={style.sidebar}
        style={{ width: `${width}px`, height: '100%', transform: `translateX(${-xPosition}px)` }}
      >
        <div onClick={toggleMenu} className={`${style.positionAbsolute} ${style.sideBarButton} ${style.backgroundColorWhite} ${style.width30} ${style.height95} ${style.displayFlex} ${style.alignCenter}`}>
          {isOpen ? (
            <span className="material-symbols-outlined">
              keyboard_double_arrow_left
            </span>
          ) : (
            <span className="material-symbols-outlined">
              keyboard_double_arrow_right
            </span>
          )}
        </div>
        <div className={style.sidebarContent}>
          <img src={logo} alt="Flolink" className="h-16" />
          <p className="text-center text-base font-bold my-5">User1님, <br /> 환영합니다!</p>
          <p className="my-1">가족 이름</p>
          <hr className="w-24 border-zinc-500 mb-2"/>
          {FamilyMembers.map((member, index) => {
            return (
              <SideBarItem name={member} key={index}/>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
