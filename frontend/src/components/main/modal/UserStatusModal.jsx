import style from "../../../css/main/main_modals.module.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { yourMyroom } from "../../../service/myroom/myroomApi";

function UserStatusModal({ member, username, handleUsername }) {
  const [isModify, setIsModify] = useState(false)
  const [inputname, setInputname] = useState(username)
  const navigate = useNavigate();

  function handleIsModify() {
    setIsModify(!isModify)
  }

  function handleInputname (event) {
    setInputname(event.target.value)
    if (event.target.value.length > 10) {
      window.alert('10자까지 입력 가능합니다.')
    }
  }

  const handleMyRoomClick = async () => {
    try {
        await yourMyroom(targetUserRoomId);
      } catch (error) {
        console.log(error);
      }finally {
      navigate('/yourroom', {state: { 
        userRoomId: member?.targetUserRoomId,
        userNickname: member?.targetNickname
    } });

    }
  };

  function submitUsername(event) {
    event.preventDefault()
    window.alert('변경하시겠습니까?')
    handleUsername(inputname)
    handleIsModify()
  }

  return (
    <div className={`w-72 h-52 backdrop-blur-sm ${style.mainModal}`}>
      {member?.emotion === "HAPPY" ? 
        <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '.png'}
        alt="profile_photo" className="w-14 rounded-full mt-4 border-2 border-gray-500" /> :
        <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '_' + member?.emotion?.toLowerCase() + '.png'}
        alt="profile_photo" className="w-14 rounded-full mt-4 border-2 border-gray-500" />
      }
      <div className='flex items-center'>
        {member?.role === "admin" ?
          <div className='flex justify-center items-center w-8 h-4 bg-rose-400 rounded text-white text-xs'>
            방장
          </div> :
          null
        }
        {isModify ?
        <form action="" onSubmit={submitUsername}>
          <input type="text" onChange={handleInputname}
            maxLength={10} value={inputname} placeholder={member?.targetNickname}
            className="border-0 ring-1 ring-inset ring-gray-300 mx-1 w-24" />
          <input type="submit" value="변경" />
        </form>
           :
          <>
            <p className='font-bold text-center leading-3 mx-2'>{inputname}</p>
            <span className="material-symbols-outlined text-xl"
              onClick={handleIsModify}>
              edit
            </span>
          </>
        }
      </div>
      {member?.statusMessage ?
        <p className="my-2 text-zinc-500">{member?.statusMessage}</p> :
        <p className="my-2 text-zinc-500">상태메세지가 없습니다.</p>
      }
      <hr className="w-56 mb-2 border-zinc-400" />
      <div className='flex items-center justify-center w-52 my-1'>
        <button onClick={handleMyRoomClick} className='w-24 h-8 bg-blue-400 rounded-lg text-white'>
          <p className="m-0 text-sm font-bold flex justify-center items-center">
            <span className="material-symbols-outlined text-lg" style={{ 'fontVariationSettings': '"FILL" 1' }}>
              meeting_room
            </span>마이룸 보기</p>
        </button>
      </div>
    </div>
  )
}

export default UserStatusModal;