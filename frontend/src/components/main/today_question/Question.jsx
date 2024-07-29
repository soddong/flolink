function Question (props) {
  return (
    <div className="w-80 inset-x-auto bottom-20 absolute h-20 rounded-lg flex items-center justify-center z-10 bg-gradient-to-b from-white/40 to-zinc-400/40 backdrop-blur-sm" style={{'boxShadow': '0px 0px 10px 0px #00000034'}}>
      <button className="absolute right-0 rounded-lg bg-rose-400 text-white text-xs font-bold w-24 h-8 z-10"
      style={{'top': '-40px'}}>
          함께 산책하기
      </button>
      <p className="text-zinc-800">{props.message}</p>
    </div>
  )
}

export default Question;