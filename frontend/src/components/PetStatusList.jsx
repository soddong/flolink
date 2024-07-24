import style from '../css/main.module.css'
import PetStatusListItem from './PetStatusListItem'

function PetStatusList () {
  const statList = ['애정도', '포만감', '체력']
  const statusList = [0.6, 0.4, 0.8]
  return (
    <div className={`${style.marginTop15} ${style.height80} ${style.positionRelative}`}>
      <div className={`${style.borderWhite2px} ${style.heightFull} ${style.width150} ${style.positionAbsolute} ${style.positionRight} ${style.displayFlex} ${style.flexColumn} ${style.alignCenter}`}>
        <p className={`${style.margin3_0} ${style.fontSize12} ${style.fontBolder} ${style.colorWhite}`}>STATS</p>
        <PetStatusListItem />
      </div>
    </div>
  )
}

export default PetStatusList;