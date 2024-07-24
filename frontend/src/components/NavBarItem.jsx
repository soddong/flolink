import style from '../css/main.module.css'

function NavBarItem (props) {
  return (
    <div>
      <span className="material-symbols-outlined" style={{'fontVariationSettings': '"FILL" 0', 'fontSize': '40px', 'color': '#767676'}}>
        {props.span}
      </span>
      <p className={`${style.margin0} ${style.color767676} ${style.fontSize10} ${style.textCenter}`}>{props.name}</p>
    </div>
  )
}

export default NavBarItem;