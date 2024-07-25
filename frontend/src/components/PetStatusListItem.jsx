function PetStatusListItem (props) {
  return (
    <div className="flex h-5">
      <div className="w-8 h-3 rounded-md flex justify-center items-center" style={{'backgroundColor': props.color}}>
        <p className="m-0 text-white font-bold" style={{'fontSize': '8px'}}>{props.name}</p>
      </div>
      <div className="flex items-center h-3 w-28 px-1 border-box">
        <hr className="w-24 border-4 border-solid border-slate-50 rounded absolute"/>
        <hr className="rounded absolute" style={{'width': props.value + 'px', 'border': '4px solid '+props.color}}/>
      </div>
    </div>
  )
}

export default PetStatusListItem;