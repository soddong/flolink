import style from '../css/main.module.css'

function Question (props) {
  return (
    <div className={`${style.widthFull} ${style.positionRelative} ${style.height70} ${style.borderRadius10} ${style.shadow0_0_10_0} ${style.displayFlex} ${style.alignCenter} ${style.justifyCenter} ${style.backgroundColorGradient} ${style.index2}`}>
      <p className={`${style.fontSize15}`}>{props.message}</p>
    </div>
  )
}

export default Question;