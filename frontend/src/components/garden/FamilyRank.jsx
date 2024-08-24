import Photo from '../../assets/profile/profile_dummy.jpg'

function FamilyRank ({member}) {
  return (
    <div className="w-full h-16 bg-white rounded mb-2 flex items-center relative"
    style={{'boxShadow': '0px 0px 10px 1px #00000034'}}>
      <p className="text-base ml-3 w-7 font-bold" 
      style={{'color': member?.monthlyRank === 1? '#D1556E' : '#767676'}}>{member?.monthlyRank}위</p>
      {member?.emotion === "HAPPY" ?
      <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '.png'} 
      alt="profile_image" className='rounded-full w-10 h-10' /> :
      <img src={import.meta.env.BASE_URL + 'profile/' + member?.profile?.toLowerCase() + '_' + member?.emotion?.toLowerCase() + '.png'} 
      alt="profile_image" className='rounded-full w-10 h-10' />
      }
      <div className='m-2'>
        <p className='font-bold'>{member?.nickname}</p>
        <p className='text-xs text-gray-500'>누적 포인트: {member?.contributeExp}p</p>
      </div>
    </div>
  )
}

export default FamilyRank;