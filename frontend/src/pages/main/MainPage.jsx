import Notification from '../../components/main/notification/Notification';
import UserStatusList from '../../components/main/user_status/UserStatusList';
import PetStatusList from '../../components/main/tamagochi/PetStatusList';
import NavBar from '../../components/common/nav_bar/NavBar';
import Question from '../../components/main/today_question/Question';
import Pet from '../../assets/tamagochi/flower1.png'
import BackgroundPhoto from '../../assets/main/background_photo.png'
import React, {useEffect, useRef, useState } from "react";
import Sidebar from '../../components/common/side_bar/SideBar';

function MainPage() {
  const Message = '오늘은 어떤 일이 있었나요?'
  return (
  <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative">
    <Sidebar />
    <div className="p-7 w-full box-border">
      <header className="flex justify-between">
        <h1 className="m-0 font-bold text-2xl text-rose-500">우리는 꿀벌 가족🍯</h1>
        <div className="w-8 h-8 text-white bg-rose-400 rounded flex justify-center items-center">
          <span className="material-symbols-outlined" style={{'fontVariationSettings': '"FILL" 1'}}>
            notifications
          </span>
        </div>
      </header>
      <Notification />
      <UserStatusList />
      <PetStatusList />
      <div className="w-full h-56 flex justify-center items-center relative">
        <img src={Pet} alt='dummy_pet_photo' className="h-52 z-10"/>
      </div>
      <Question message={Message}/>
    </div>
    <img src={BackgroundPhoto} alt="background_photo" className="w-full absolute bottom-16" />
    <NavBar />
  </div>
  )
}

export default MainPage;