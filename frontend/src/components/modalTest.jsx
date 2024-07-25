import style from '../css/side_bar.module.css';

function Modal(){
  return (
  <div className={`${style.userDetailModal}`}>
    <h4>Title</h4>
    <p>Contents</p>
    <span>Date</span>
  </div>
  )
}

export default Modal;