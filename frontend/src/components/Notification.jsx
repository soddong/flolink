import '../css/main.css'

function Notification (props) {
  return (
    <div>
      <h1>📌공지!</h1>
      <p>{props.message}</p>
    </div>
  )
}

export default Notification;