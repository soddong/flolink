import style from "../../../css/main/main_modals.module.css"

function UserStatusModal ({name, photo, status}) {

  return (
    <div className={`w-72 h-52 backdrop-blur-sm ${style.mainModal}`}>
      <img src={photo} alt="dummy_profile" className='w-10 rounded-full mt-2' />
      <div className='flex items-center'>
        <div className='flex justify-center items-center w-6 h-3 bg-rose-400 rounded-sm text-white font-bold' style={{'fontSize': '8px'}}>방장</div>
        <p className='font-bold text-center leading-3 mx-2'>{name}</p>
        <span className="material-symbols-outlined text-xl">
          edit
        </span>
      </div>
      <p className="my-2 text-sm text-zinc-500">{status}</p>
      <hr className="w-56 border-zinc-400"/>
      <div className='flex items-center justify-around w-48'>
        <p className="text-xs">가입일: 0000-00-00</p> | 
        <p className="text-xs">작성글: n개</p>
      </div>
      <div className='flex items-center justify-around w-52 my-1'>
        <button className='w-24 h-8 bg-rose-400 rounded-lg text-white'>
          <p className="m-0 text-sm font-bold flex justify-center items-center">
            <span className="material-symbols-outlined text-lg" style={{'fontVariationSettings': '"FILL" 1'}}>
              meeting_room
            </span>마이룸 보기</p>
        </button>
        <button className='w-24 h-8 bg-blue-300 rounded-lg text-white flex items-center justify-center'>
          <p className="m-0 text-sm font-bold flex justify-center items-center">
            <span className="material-symbols-outlined text-lg" style={{'fontVariationSettings': '"FILL" 1'}}>
              meeting_room
            </span>작성글 보기</p>
        </button>
      </div>
    </div>
  )
}

export default UserStatusModal;