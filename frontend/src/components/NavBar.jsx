import style from '../css/main.module.css'
import NavBarItem from './NavBarItem';

function NavBar () {
  const NavBarSpanList = ['calendar_month', 'newsmode', 'home', 'deceased', 'account_circle']
  const NavBarNameList = ['가족 일정', '일기장', 'Home', '기억정원','마이룸']
  return (
    <div className={`${style.positionAbsolute} ${style.positionBottom} ${style.widthFull} ${style.height70} ${style.backgroundColorWhite70} ${style.borderBox} ${style.displayFlex} ${style.alignCenter} ${style.justifyBetween} ${style.padding5_20}`}>
      {NavBarSpanList.map((item, index) => {
        return (
          <NavBarItem span={item} name={NavBarNameList[index]} key={index}/>
        )
      })}
    </div>
  )
}

export default NavBar;