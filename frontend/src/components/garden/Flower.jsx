function Flower ({id, month, flower}) {
  console.log(flower)
  return (
    <div className="flex flex-col justify-center items-center rounded-xl"
    style={{'backgroundColor': id%2 === 0 ? '#E5C2A2': null}}>
      <img src={flower} alt="flower_photo"
      className="w-1/2" />
      <div className="text-xs w-4/5 h-1/4 flex justify-center items-center rounded text-orange-900" 
      style={{'backgroundColor': '#D2AB86'}}>
        {month}
      </div>
    </div>
  )
}

export default Flower;