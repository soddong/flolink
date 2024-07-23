import style from '../css/main.module.css'
import ProfilePhoto from './ProfilePhoto';

function UserStatusList () {
  return (
    <div className={`${style.borderBox} ${style.marginTop15} ${style.height80} ${style.padding5_20} ${style.backgroundColorWhite70} ${style.borderRadius10} ${style.displayFlex} ${style.flexColumn} ${style.alignCenter}`}>
      <p className={`${style.fontSize15} ${style.margin0} ${style.fontBolder} ${style.color767676}`}>오늘 우리의 기분은?</p>
      <ProfilePhoto />
    </div>
  )
}

export default UserStatusList;