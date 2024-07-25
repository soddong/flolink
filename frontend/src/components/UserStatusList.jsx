import ProfilePhoto from './ProfilePhoto';

function UserStatusList () {
  const imageList = ['엄마', '아빠', '첫째', '둘째']
  return (
    <div className="border-box mt-3.5 h-24 py-1 px-5 bg-white bg-opacity-75 rounded-xl flex flex-col items-center">
      <p className="text-base m-0 font-bold text-zinc-500">오늘 우리의 기분은?</p>
      <div className="flex w-full justify-around my-1.5">
        {imageList.map((image, index) => {
          return (
            <ProfilePhoto name={image} key={index} />
          );
        })}
      </div>
    </div>
  )
}

export default UserStatusList;