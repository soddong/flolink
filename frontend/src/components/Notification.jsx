function Notification (props) {
  return (
    <div className="border-box mt-4 h-20 py-2.5 px-5 bg-white bg-opacity-30 rounded-xl" style={{'box-shadow': '0px 0px 10px 0px #00000034'}}>
      <p className="text-xl mt-0.5 font-bold">📌 공지!</p>
      <p className="text-sm m-0 text-zinc-500">{props.message}</p>
    </div>
  )
}

export default Notification;