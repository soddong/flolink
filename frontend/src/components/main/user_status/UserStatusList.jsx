import ProfilePhoto from './ProfilePhoto';
import Photo from '../../../assets/profile/profile_dummy.jpg'

function UserStatusList () {
  const memberList = [
    { id: 1, name: '엄마', photo: Photo, status: '화남'},
    { id: 2, name: '아빠', photo: Photo, status: '행복'},
    { id: 3, name: '첫째', photo: Photo, status: '행복'},
    { id: 4, name: '둘째', photo: Photo, status: '슬픔'},
  ]
  
  return (
    <div className="border-box mt-3.5 h-24 py-1 px-5 bg-white/75 rounded-xl flex flex-col items-center">
      <div className='flex w-full relative justify-center items-center'>
        <p className="text-base m-0 font-bold text-zinc-500">오늘 우리의 기분은?</p>
      </div>
      <div className="flex w-full justify-around my-1.5">
        {memberList.map((member) => {
          return (
            <ProfilePhoto name={member.name} photo={member.photo} status={member.status} key={member.id} />
          );
        })}
      </div>
    </div>
  )
}

export default UserStatusList;