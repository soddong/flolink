import '../css/main.module.css'

function Notification (props) {
  return (
    <div className='border-box margin-top-15 height-80 padding-10-20 background-color-white-30 border-radius-10 shadow-0-0-10-0'>
      <p className='font-size-20 margin-3-0 font-bolder'>📌 공지!</p>
      <p className='font-size-15 margin-0 color-767676'>{props.message}</p>
    </div>
  )
}

export default Notification;