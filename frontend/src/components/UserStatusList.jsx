import '../css/main.module.css'
import ProfilePhoto from './ProfilePhoto';

function UserStatusList () {
  return (
    <div className='border-box margin-top-15 height-80 padding-5-20 background-color-white-70 border-radius-10 display-flex flex-column align-center'>
      <p className='font-size-15 margin-0 font-bolder color-767676'>오늘 우리의 기분은?</p>
      <ProfilePhoto />
    </div>
  )
}

export default UserStatusList;