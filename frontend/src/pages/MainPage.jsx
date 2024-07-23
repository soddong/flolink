import style from '../css/main.module.css'
import Notification from '../components/Notification';
import UserStatusList from '../components/UserStatusList';

function MainPage() {
  return (
  <div>
    <header className='display-flex justify-between'>
      <h1 className='margin-0 font-bolder color-E37C91 font-size-24'>우리는 꿀벌 가족🍯</h1>
      <div className='width-30 height-30 color-white backgroundcolor-E37C91 border-radius-5 display-flex justify-center align-center'>
      <span class="material-symbols-outlined">
        notifications
        </span>
      </div>
    </header>
    <Notification message='️오늘 저녁에 외식 예정. 7시까지 오세요!' />
    <UserStatusList />
  </div>
  )
}

export default MainPage;