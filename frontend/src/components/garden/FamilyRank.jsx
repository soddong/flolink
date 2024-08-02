import Photo from '../../assets/profile/profile_dummy.jpg'

function FamilyRank ({name, rank, point}) {
  return (
    <div className="w-full h-1/6 bg-white rounded mb-2 flex items-center relative"
    style={{'boxShadow': '0px 0px 10px 1px #00000034'}}>
      <p className="text-base ml-3 w-7 font-bold" 
      style={{'color': rank === 1? '#D1556E' : '#767676'}}>{rank}위</p>
      <img src={Photo} alt="profile_photo" className='rounded-full w-10' />
      <div className='m-2'>
        <p className='font-bold'>{name}</p>
        <p className='text-xs text-gray-500'>누적 포인트: {point}p</p>
      </div>
      {rank === 1 && (
        <button className='text-sm absolute right-2 bg-rose-400 w-14 h-6 text-white rounded'>
          축하하기
        </button>
      )}
    </div>
  )
}

export default FamilyRank;