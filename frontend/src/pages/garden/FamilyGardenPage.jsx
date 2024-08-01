import NavBar from '../../components/common/nav_bar/NavBar';
import Background from '../../assets/garden/garden_background.png'
import Header from '../../assets/garden/panel_head.png'
import Garden from '../../components/garden/Garden';

function FamilyGardenPage () {
  return (
    <div className="w-full h-full box-border relative bg-cover"
    style={{'backgroundImage': `url(${Background})`}}>
      <header style={{'height': '15vh'}}>
        <div className='flex justify-center w-64 h-20 bg-contain bg-no-repeat bg-center'
        style={{'backgroundImage': `url(${Header})`}}>
          <h1 className='text-3xl font-bold text-red-900 absolute top-7'>기억정원🌷</h1>
        </div>
      </header>
      <Garden />
      <NavBar />
    </div>
  )
}

export default FamilyGardenPage;