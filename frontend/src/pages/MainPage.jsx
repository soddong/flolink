import Notification from '../components/Notification';
import UserStatusList from '../components/UserStatusList';
import PetStatusList from '../components/PetStatusList';
import NavBar from '../components/NavBar';
import Question from '../components/Question';
import Max from '../assets/max.png'
import BackgroundPhoto from '../assets/background_photo.png'
import React, {useEffect, useRef, useState } from "react";
import Sidebar from '../components/SideBar';

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
      <Notification message='️오늘 저녁에 외식 예정. 7시까지 오세요!' />
      <UserStatusList />
      <PetStatusList />
      <div className="w-full h-56 flex justify-center items-center relative">
        <img src={Max} alt='dummy_pet_photo' className="h-52 z-10"/>
        <button className="absolute bottom-2.5 right-0 rounded-lg bg-rose-400 text-white text-xs font-bold w-24 h-8 z-10">
          함께 산책하기
        </button>
      </div>
      <Question message={Message}/>
    </div>
    <img src={BackgroundPhoto} alt="background_photo" className="w-full absolute bottom-16" />
    <NavBar />
  </div>
  )
}

export default MainPage;