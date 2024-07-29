import NavBarItem from './NavBarItem';

function NavBar () {
  const NavBarSpanList = ['calendar_month', 'newsmode', 'home', 'deceased', 'account_circle']
  const NavBarNameList = ['가족 일정', '일기장', 'Home', '기억정원','마이룸']
  return (
    <div className="absolute bottom-0 w-full h-16 bg-white/75 box-border flex items-center justify-between py-1 px-5">
      {NavBarSpanList.map((item, index) => {
        return (
          <NavBarItem span={item} name={NavBarNameList[index]} key={index}/>
        )
      })}
    </div>
  )
}

export default NavBar;