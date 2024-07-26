import style from '../css/side_bar.module.css';
import Photo from '../assets/profile_dummy.jpg'

function Modal(props){
  return (
  <div className={"backdrop-blur-md absolute " + `${style.userDetailModal} ${style.modalAppear}`}>
    <img src={Photo} alt="dummy_profile" className='w-10 rounded-full mt-2' />
    <div className='flex items-center'>
      <div className='flex justify-center items-center w-6 h-3 bg-rose-400 rounded-sm text-white font-bold' style={{'fontSize': '8px'}}>방장</div>
      <p className='text-sm font-bold text-center leading-3 mx-2'>{props.member}</p>
      <span className="material-symbols-outlined text-xl">
        edit
      </span>
    </div>
    <div className='flex items-center justify-around w-48'>
      <p className="text-xs">가입일: 0000-00-00</p> | 
      <p className="text-xs">작성글: n개</p>
    </div>
    <div className='flex items-center justify-around w-52 my-1'>
      <div className='w-24 h-8 bg-rose-400 rounded-lg text-white flex items-center justify-center'>
        <span className="material-symbols-outlined text-lg" style={{'fontVariationSettings': '"FILL" 1'}}>
          meeting_room
        </span>
        <p className="m-0 text-xs font-bold">
          마이룸 보기
        </p>
      </div>
      <div className='w-24 h-8 bg-blue-300 rounded-lg text-white flex items-center justify-center'>
        <span className="material-symbols-outlined text-lg" style={{'fontVariationSettings': '"FILL" 1'}}>
          meeting_room
        </span>
        <p className="m-0 text-xs font-bold">
          작성글 보기
        </p>
      </div>
    </div>
  </div>
  )
}

export default Modal;