import NavBar from '../../components/common/nav_bar/NavBar';
import Background from '../../assets/garden/garden_background.png'
import Header from '../../assets/garden/panel_head.png'
import Garden from '../../components/garden/Garden';
import YearStatus from '../../components/garden/YearStatus';

function FamilyGardenPage () {
  const year = 2024
  const flowerSuccess = 9
  const flowerTotal = 12
  const feedCount = 24
  return (
    <div className="w-full h-full box-border relative bg-cover flex flex-col items-center"
    style={{'backgroundImage': `url(${Background})`}}>
      <header style={{'height': '12vh'}}>
        <div className='flex justify-center w-64 h-20 bg-contain bg-no-repeat bg-center'
        style={{'backgroundImage': `url(${Header})`}}>
          <h1 className='text-2xl font-bold text-red-900 absolute top-8'>기억정원🌷</h1>
        </div>
      </header>
      <Garden year={year} />
      <YearStatus year={year} total={flowerTotal} success={flowerSuccess} feedCount={feedCount} />
      <NavBar />
    </div>
  )
}

export default FamilyGardenPage;