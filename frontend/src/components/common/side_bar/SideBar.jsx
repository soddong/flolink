import React, { useEffect, useRef, useState } from "react";
import style from '../../../css/main/side_bar.module.css';
import SideBarItem from "./SideBarItem";
import Photo from '../../../assets/profile/profile_dummy.jpg'



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
        className= {`${style.sidebar}` + " bg-zinc-800/80 backdrop-blur-md"}
        style={{ width: `${width}px`, height: '100%', transform: `translateX(${-xPosition}px)` }}
      >
        <div onClick={toggleMenu} className={`${style.sideBarButton}` + " bg-zinc-800/80"}>
          {isOpen ? (
            <span className="material-symbols-outlined text-white">
              keyboard_double_arrow_left
            </span>
          ) : (
            <span className="material-symbols-outlined text-white">
              keyboard_double_arrow_right
            </span>
          )}
        </div>
        <div className={style.sidebarContent}>
          <img src={Photo} alt="Flolink" className="h-16 rounded-full" />
          <p className="text-center text-base font-bold mb-5 text-white">User1님</p>
          <p className="my-1 text-white text-xl font-bold">가족 이름</p>
          <hr className="w-28 border-white mb-2"/>
          {FamilyMembers.map((member, index) => {
            return (
              <div>
                <SideBarItem name={member} key={index}/>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
