import style from '../css/main.module.css'
import PetStatusListItem from './PetStatusListItem'

function PetStatusList () {
  const statList = ['애정도', '포만감', '체력']
  const statusList = [60, 40, 80]
  const statusColor = ['#E37C91', '#6CCD57', '#85ABEA']
  return (
    <div className={`${style.marginTop15} ${style.height80} ${style.positionRelative}`}>
      <div className={`${style.borderWhite2px} ${style.heightFull} ${style.width150} ${style.positionAbsolute} ${style.positionRight} ${style.displayFlex} ${style.flexColumn} ${style.alignCenter}`}>
        <p className={`${style.margin3_0} ${style.fontSize12} ${style.fontBolder} ${style.colorWhite}`}>STATS</p>
        {statList.map((stat, index) => {
          return (
            <PetStatusListItem name={stat} value={statusList[index]} color={statusColor[index]}/>
          )
        })}
      </div>
    </div>
  )
}

export default PetStatusList;