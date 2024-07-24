import style from '../css/main.module.css'

function Notification (props) {
  return (
    <div className={`${style.borderBox} ${style.marginTop15} ${style.height80} ${style.padding10_20} ${style.backgroundColorWhite30} ${style.borderRadius10} ${style.shadow0_0_10_0}`}>
      <p className={`${style.fontSize20} ${style.margin3_0} ${style.fontBolder}`}>📌 공지!</p>
      <p className={`${style.fontSize15} ${style.margin0} ${style.color767676}`}>{props.message}</p>
    </div>
  )
}

export default Notification;