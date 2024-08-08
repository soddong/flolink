function NavBarItem (props) {
  return (
    <div onClick={props.onClick}>
      <span className="material-symbols-outlined flex justify-center" style={{'fontVariationSettings': '"FILL" 0', 'fontSize': '35px', 'color': '#767676'}}>
        {props.span}
      </span>
      <p className="m-0 text-zinc-500 text-xs text-center">{props.name}</p>
    </div>
  )
}

export default NavBarItem;