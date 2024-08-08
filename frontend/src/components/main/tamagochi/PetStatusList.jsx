import { useState } from 'react'

function PetStatusList ({pet, status}) {

  return (
    <div className="w-full relative h-2/3 mt-3.5 flex justify-center">
      <div className="h-16 border-2 border-solid border-white right-0 flex flex-col items-center">
        <p className="text-lg text-lime-500">총 경험치</p>
        <div className='flex justify-around w-72 h-8 p-2'>
          <div className="w-10 h-4 rounded-md flex justify-center items-center bg-lime-500">
            <p className="m-0 text-white text-xs font-bold">EXP</p>
          </div>
          <div className="flex items-center h-4 w-full px-2 border-box">
            <hr className="border-4 border-solid border-slate-50 rounded absolute" style={{'width': '200px'}}/>
            <hr className="rounded absolute border-4 border-solid border-lime-500" style={{'width': status*2 + 'px'}}/>
          </div>
        </div>
      </div>
      <img src={pet} alt="dummy_pet_photo" className='z-10 absolute bottom-20 h-3/5' />
    </div>
  )
}

export default PetStatusList;