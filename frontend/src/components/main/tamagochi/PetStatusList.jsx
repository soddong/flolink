import PetStatusListItem from './PetStatusListItem'

function PetStatusList () {
  const statList = ['애정도', '포만감', '체력']
  const statusList = [60, 40, 80]
  const statusColor = ['#E37C91', '#6CCD57', '#85ABEA']
  return (
    <div className="mt-3.5 h-16 relative">
      <div className="h-full border-2 border-solid border-white w-40 absolute right-0 flex flex-col items-center">
        <p className="text-xs font-bold text-white">STATS</p>
        {statList.map((stat, index) => {
          return (
            <PetStatusListItem name={stat} value={statusList[index]} color={statusColor[index]} key={index}/>
          )
        })}
      </div>
    </div>
  )
}

export default PetStatusList;