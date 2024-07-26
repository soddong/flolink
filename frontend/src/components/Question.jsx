function Question (props) {
  return (
    <div className="w-full relative h-20 rounded-lg flex items-center justify-center z-10 bg-gradient-to-b from-white/40 to-zinc-400/40 backdrop-blur-sm" style={{'boxShadow': '0px 0px 10px 0px #00000034'}}>
      <p className="text-zinc-800">{props.message}</p>
    </div>
  )
}

export default Question;