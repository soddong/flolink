import style from '../css/main.module.css'
import Notification from '../components/Notification';
import UserStatusList from '../components/UserStatusList';
import PetStatusList from '../components/PetStatusList';
import NavBar from '../components/NavBar';
import Question from '../components/Question';
import Max from '../assets/max.png'
import BackgroundPhoto from '../assets/background_photo.png'

function MainPage() {
  const Message = '오늘은 어떤 일이 있었나요?'
  return (
  <div className={`${style.apps} ${style.positionRelative}`}>
    <div className={`${style.padding30} ${style.widthFull} ${style.borderBox} ${style.index2}`}>
      <header className={`${style.displayFlex} ${style.justifyBetween}`}>
        <h1 className={`${style.margin0} ${style.fontBolder} ${style.colorE37C91} ${style.fontSize24}`}>우리는 꿀벌 가족🍯</h1>
        <div className={`${style.width30} ${style.height30} ${style.colorWhite} ${style.backgroundColorE37C91} ${style.borderRadius5} ${style.displayFlex} ${style.justifyCenter} ${style.alignCenter}`}>
          <span className="material-symbols-outlined" style={{'fontVariationSettings': '"FILL" 1'}}>
            notifications
          </span>
        </div>
      </header>
      <Notification message='️오늘 저녁에 외식 예정. 7시까지 오세요!' />
      <UserStatusList />
      <PetStatusList />
      <div className={`${style.widthFull} ${style.height300} ${style.displayFlex} ${style.justifyCenter} ${style.alignCenter} ${style.positionRelative} ${style.margin10_0}`}>
        <img src={Max} alt='dummy_pet_photo' className={`${style.height250}`}/>
        <button className={`${style.positionAbsolute} ${style.positionBottom} ${style.positionRight} ${style.borderRadius10} ${style.backgroundColorE37C91} ${style.colorWhite} ${style.fontSize12} ${style.fontBolder} ${style.width100} ${style.height30}`}>
          함께 산책하기
        </button>
      </div>
      <Question message={Message}/>
    </div>
    <img src={BackgroundPhoto} alt="background_photo" className={`${style.widthFull} ${style.positionAbsolute} ${style.positionBottom70} ${style.index1}`} />
    <NavBar />
  </div>
  )
}

export default MainPage;