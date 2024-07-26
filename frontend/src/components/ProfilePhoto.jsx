import Photo from '../assets/profile_dummy.jpg'

function ProfilePhoto (props) {
  return (
    <div>
      <img src={Photo} alt="profile_photo" className="w-10 rounded-full" />
      <p className="text-xs m-0 text-center text-zinc-500">{props.name}</p>
    </div>
  )
}

export default ProfilePhoto;