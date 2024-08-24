function NavBarItem (props) {
  return (
    <div onClick={props.onClick}>
      <span className="material-symbols-outlined flex justify-center" 
      style={{'fontVariationSettings': '"FILL" 0', 'fontSize': '35px', 'color': props.isActive? '#D1556E' : '#767676',
        'fontWeight': props.isActive ? "bolder" : "normal"
      }}>
        {props.span}
      </span>
      <p className="m-0 text-zinc-500 text-sm text-center"
      style={{'color': props.isActive ? '#D1556E' : '#767676', 'fontWeight': props.isActive ? "bolder" : "normal"}}>{props.name}</p>
    </div>
  )
}

export default NavBarItem;