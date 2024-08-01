import NavBar from '../../components/common/nav_bar/NavBar';
import Background from '../../assets/garden/garden_background.png'
import Header from '../../assets/garden/panel_head.png'

function FamilyGardenPage () {
  return (
    <div className="w-full h-full box-border relative">
      <img src={Background} alt="garden_background"
      className='w-full h-full absolute' />
      <div className='relative flex justify-center w-64'>
        <img src={Header} alt="panel_head" className='absolute' />
        <h1 className='text-3xl font-bold text-red-900 absolute top-7'>기억정원🌷</h1>
      </div>
      <NavBar />
    </div>
  )
}

export default FamilyGardenPage;