import style from "../../../css/main/main_modals.module.css"
import { useState } from "react";
import { Link } from "react-router-dom";
import { updateRoomMemberNickname } from "../../../service/userroom/userroomApi";
import userRoomStore from "../../../store/userRoomStore";

function UserStatusModal({ name, photo, status, targetUserRoomId, manager, setRoomDetail }) {
  const [isModify, setIsModify] = useState(false)
  const roomId = userRoomStore((state) => state.roomId);
  const [username, setUsername] = useState(name)

  function handleIsModify() {
    setIsModify(!isModify)
  }

  function handleUsername (event) {
    setUsername(event.target.value)
    if (event.target.value.length > 10) {
      window.alert('10자까지 입력 가능합니다.')
    }
  }

  function submitUsername(event) {
    event.preventDefault()
    updateRoomMemberNickname({
      targetNickname : username,
      roomId,
      targetUserRoomId
    })
    console.log(targetUserRoomId);
    console.log(username);
    window.alert('변경변경?')
    handleIsModify()
  }

  return (
    <div className={`w-72 h-52 backdrop-blur-sm ${style.mainModal}`}>
      <img src={photo} alt="dummy_profile" className='w-10 rounded-full mt-2' />
      <div className='flex items-center'>
        {manager ?
          <div className='flex justify-center items-center w-8 h-4 bg-rose-400 rounded text-white text-xs'>
            방장
          </div> :
          null
        }
        {isModify ?
        <form action="" onSubmit={submitUsername}>
          <input type="text" onChange={handleUsername}
            maxLength={10} value={username} placeholder={username}
            className="border-0 ring-1 ring-inset ring-gray-300 mx-1 w-24" />
          <input type="submit" value="변경" />
        </form>
           :
          <>
            <p className='font-bold text-center leading-3 mx-2'>{username}</p>
            <span className="material-symbols-outlined text-xl"
              onClick={handleIsModify}>
              edit
            </span>
          </>
        }
      </div>
      <p className="my-2 text-lg text-zinc-500">{status}</p>
      <hr className="w-56 border-zinc-400" />
      <div className='flex items-center justify-around w-52 my-1'>
        <Link to="/myroom">
          <button className='w-24 h-8 bg-rose-400 rounded-lg text-white'>
            <p className="m-0 text-sm font-bold flex justify-center items-center">
              <span className="material-symbols-outlined text-lg" style={{ 'fontVariationSettings': '"FILL" 1' }}>
                meeting_room
              </span>마이룸 보기</p>
          </button>
        </Link>
        <Link to="/feedlist">
          <button className='w-24 h-8 bg-blue-300 rounded-lg text-white flex items-center justify-center'>
            <p className="m-0 text-sm font-bold flex justify-center items-center">
              <span className="material-symbols-outlined text-lg" style={{ 'fontVariationSettings': '"FILL" 1' }}>
                meeting_room
              </span>작성글 보기</p>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default UserStatusModal;