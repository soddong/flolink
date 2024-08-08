import style from '../../../css/main/main_modals.module.css'
import { useState, useEffect } from 'react'

function RoomInfoModal ({roomDetail}) {
  const [members, setMembers] = useState([])

  useEffect (() => {
    setMembers(roomDetail?.memberInfoResponses)
  }, [roomDetail])

  return (
    <div className={`absolute w-2/3 p-4 ${style.mainModal}`}>
      <h1 className='text-2xl font-bold'>가족방 정보</h1>
      <hr className='w-full border-black m-2'/>
      <p className='flex justify-between w-5/6'>
        <span className='text-lg font-bold w-20'>이름</span> 
        <span className='w-36 truncate'>{roomDetail?.roomSummarizeResponse?.roomName}</span>
      </p>
      <p className='flex justify-between w-5/6'>
        <span className='text-lg font-bold w-20'>비밀번호</span> 
        <span className='w-36'>{roomDetail?.roomSummarizeResponse?.roomParticipatePassword}</span>
      </p>
      <hr className='w-full border-black m-2'/>
      <h2 className='text-lg font-bold'>가족 멤버 정보</h2>
      <ul className='w-11/12'>
        {members ? members.map((member, index) => (
          <>
            <hr className='w-full border-slate-400 m-2'/>
            <li key={index} className='flex items-center relative'>
              <img src={member?.profile} alt="profile" className='border-2 rounded-full w-10 h-10 mx-2' />
              {member?.targetNickname}
              <span className='absolute right-2 text-gray'>{member?.emotion}</span>
            </li>
          </>
        )) : (
          <p>hello</p>
        )}
      </ul>
    </div>
  )
}

export default RoomInfoModal;