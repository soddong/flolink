import React, { useRef, useState } from "react";
import style from '../../../css/main/side_bar.module.css';
import SideBarItem from "./SideBarItem";
import Photo from '../../../assets/profile/profile_dummy.jpg'



function Sidebar ({ width = 150, children }){
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef();
  const sideItems = [
    { id: 1, name: '상점', router: '/payment'},
    { id: 2, name: '마이룸', router: '/myroom'},
    { id: 3, name: '가족방 변경', router: '/test'},
    { id: 4, name: '설정 페이지', router: '/setting'},
    { id: 5, name: '로그아웃', router: '/login'},
    { id: 6, name: '가족방 탈퇴', router: '/test'},
  ]
  
  function toggleMenu () {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  }


  return (
    <div className="bg-white">
      <div
        ref={side}
        className= {`${style.sidebar}` + " bg-zinc-800/80 backdrop-blur-md"}
        style={{ width: `${width}px`, height: '100%', left: isOpen ? '0' : `-${width}px` }}
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
          {sideItems.map((item) => {
            return (
              <div key={item.id}>
                <SideBarItem name={item.name} router={item.router}/>
              </div>
            )
          })}
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
