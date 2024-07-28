import ProfilePhoto from './ProfilePhoto';
import { useState } from 'react';
import Modal from './UserStatusModifyModal';

function UserStatusList () {
  const imageList = ['엄마', '아빠', '첫째', '둘째']
  const [modal, setModal] = useState()
  function showStatusModal () {
    setModal(!modal)
  } 
  
  return (
    <div className="border-box mt-3.5 h-24 py-1 px-5 bg-white/75 rounded-xl flex flex-col items-center">
      <div className='flex w-full relative justify-center items-center'>
        <p className="text-base m-0 font-bold text-zinc-500">오늘 우리의 기분은?</p>
        <button onClick={showStatusModal} className='absolute right-0 w-10 text-xs flex justify-center rounded bg-rose-400 text-white'>수정</button>
      </div>
      {modal && (
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-zinc-800/50 z-20"
            onClick={showStatusModal}></div>
            <Modal member='user1' />
          </>
      )}
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