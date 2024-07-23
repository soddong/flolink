import style from '../css/main.module.css'
import Notification from '../components/Notification';
import UserStatusList from '../components/UserStatusList';

function MainPage() {
  return (
  <div>
    <header className={`${style.displayFlex} ${style.justifyBetween}`}>
      <h1 className={`${style.margin0} ${style.fontBolder} ${style.colorE37C91} ${style.fontSize24}`}>우리는 꿀벌 가족🍯</h1>
      <div className={`${style.width30} ${style.height30} ${style.colorWhite} ${style.backgroundColorE37C91} ${style.borderRadius5} ${style.displayFlex} ${style.justifyCenter} ${style.alignCenter}`}>
        <span className={style.materialSymbolsOutlined}>
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