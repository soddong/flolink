import style from '../css/main.module.css'

function PetStatusListItem (props) {
  return (
    <div className={`${style.displayFlex} ${style.height20}`}>
      <div className={`${style.width30} ${style.height12} ${style.borderRadius5} ${style.displayFlex} ${style.justifyCenter} ${style.alignCenter}`}
      style={{'background-color': props.color}}>
        <p className={`${style.margin0} ${style.fontSize8} ${style.colorWhite} ${style.fontBolder}`}>{props.name}</p>
      </div>
      <div className={`${style.displayFlex} ${style.alignCenter} ${style.height12} ${style.width110} ${style.padding0_5} ${style.borderBox}`}>
        <hr className={`${style.width100} ${style.borderF5F5F5_3px} ${style.borderRadius5} ${style.positionAbsolute}`}/>
        <hr className={`${style.borderRadius5} ${style.positionAbsolute}`} style={{'width': props.value + 'px', 'border': '3px solid '+props.color}}/>
      </div>
    </div>
  )
}

export default PetStatusListItem;