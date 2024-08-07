import Notification from '../../components/main/notification/Notification';
import UserStatusList from '../../components/main/user_status/UserStatusList';
import PetStatusList from '../../components/main/tamagochi/PetStatusList';
import Question from '../../components/main/today_question/Question';
import Pet from '../../assets/tamagochi/flower1.png'
import AlarmModal from '../../components/main/modal/AlarmModal';
import BackgroundPhoto from '../../assets/main/background_photo.png'
import React, {  useState } from "react";


function MainPage() {
  const [status, setStatus] = useState(60)
    const Message = '오늘은 어떤 일이 있었나요?'
  
  return (
    <>
    <div className='py-7 w-5/6'>
        <header className="flex justify-between">
            <h1 className="m-0 font-bold text-2xl text-rose-500">우리는 꿀벌 가족🍯</h1>
            <AlarmModal />
          </header>
          <Notification />
          <UserStatusList />
          <PetStatusList pet={Pet} status={status} />
      </div>
      <Question message={Message}/>
      <img src={BackgroundPhoto} alt="background_photo" className="w-full absolute bottom-16" /> 
    </>
      
    
    
  )
}

export default MainPage;