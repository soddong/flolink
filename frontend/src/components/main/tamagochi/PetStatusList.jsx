import { useState } from 'react'

function PetStatusList ({pet, status}) {

  return (
    <div className="w-full relative h-2/3 mt-3.5 flex justify-center">
      <div className="h-16 border-2 border-solid border-white right-0 flex flex-col items-center">
        <p className="text-xl text-white">STATS</p>
        <div className='flex justify-around items-center w-72 h-8 p-2'>
          <div className="w-14 h-5 rounded-md flex justify-center items-center bg-lime-500">
            {status?.level === 4 ?
            <p className="m-0 text-white text-sm font-bold">MAX</p> : 
            <p className="m-0 text-white text-sm font-bold">{status?.level}단계</p>
            }
          </div>
          <div className="flex items-center h-4 w-full px-2 border-box">
            <hr className="border-4 border-solid border-slate-50 rounded absolute" style={{'width': '200px'}}/>
            {
              status?.level === 4 ?
              <hr className="rounded absolute border-4 border-solid border-lime-500" style={{'width': '200px'}}/> :
              <hr className="rounded absolute border-4 border-solid border-lime-500" style={{'width': status.exp*2 + 'px'}}/>
            }
          </div>
        </div>
      </div>
      <img src={pet} alt="dummy_pet_photo" className='z-10 absolute bottom-20 h-3/5' />
    </div>
  )
}

export default PetStatusList;