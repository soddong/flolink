import style from '../css/side_bar.module.css';

function Modal(props){
  return (
  <div className={`${style.userDetailModal}`}>
    <h4>Title</h4>
    <p>Contents</p>
    <span>Date</span>
    <p>{props.member}</p>
  </div>
  )
}

export default Modal;