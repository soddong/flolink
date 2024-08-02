import style from '../../css/main/main_modals.module.css'

function FlowerModal ({ month }) {
  return (
    <div className={`w-3/4 h-3/4 p-2 ${style.mainModal}`}>
      <p className='font-bold text-lg text-rose-400'>꿀벌 가족🍯: {month}의 기록</p>
    </div>
  )
}

export default FlowerModal;