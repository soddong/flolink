import style from '../css/main.module.css'
import ProfilePhoto from './ProfilePhoto';

function UserStatusList () {
  const imageList = ['엄마', '아빠', '첫째', '둘째']
  return (
    <div className={`${style.borderBox} ${style.marginTop15} ${style.height95} ${style.padding5_20} ${style.backgroundColorWhite70} ${style.borderRadius10} ${style.displayFlex} ${style.flexColumn} ${style.alignCenter}`}>
      <p className={`${style.fontSize15} ${style.margin0} ${style.fontBolder} ${style.color767676}`}>오늘 우리의 기분은?</p>
      <div className={`${style.displayFlex} ${style.widthFull} ${style.justifyAround} ${style.margin5_0}`}>
        {imageList.map((image, index) => {
          return (
            <ProfilePhoto name={image} />
          );
        })}
      </div>
    </div>
  )
}

export default UserStatusList;