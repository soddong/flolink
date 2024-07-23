import '../css/main.module.css'
import Photo from '../assets/profile_dummy.jpg'
import style from '../css/main.module.css'

function ProfilePhoto (props) {
  return (
    <div>
      <img src={Photo} alt="profile_photo" className={`${style.width40} ${style.borderRadiusFull}`} />
      <p className={`${style.fontSize10} ${style.margin0} ${style.textCenter} ${style.color767676}`}>{props.name}</p>
    </div>
  )
}

export default ProfilePhoto;