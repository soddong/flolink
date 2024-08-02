import NavBar from '../../components/common/nav_bar/NavBar';
import Background from '../../assets/garden/garden_background.png'
import Header from '../../assets/garden/panel_head.png'
import Garden from '../../components/garden/Garden';
import YearStatus from '../../components/garden/YearStatus';
import { useState } from 'react';

const years = [
  {
    id: 1,
    year: 2022, 
    flowerSuccess: 5,
    flowerTotal: 8,
    flowers: [
      {id: 1, name: '6월', level: 4},
      {id: 2, name: '7월', level: 1},
      {id: 3, name: '8월', level: 4},
      {id: 4, name: '9월', level: 4},
      {id: 5, name: '10월', level: 4},
      {id: 6, name: '11월', level: 2},
      {id: 7, name: '12월', level: 4},
    ]
  },
  {
    id: 2,
    year: 2023, 
    flowerSuccess: 10,
    flowerTotal: 12,
    flowers: [
      {id: 1, name: '1월', level: 4},
      {id: 2, name: '2월', level: 4},
      {id: 3, name: '3월', level: 3},
      {id: 4, name: '4월', level: 4},
      {id: 5, name: '5월', level: 4},
      {id: 6, name: '6월', level: 4},
      {id: 7, name: '7월', level: 4},
      {id: 8, name: '8월', level: 4},
      {id: 9, name: '9월', level: 4},
      {id: 10, name: '10월', level: 4},
      {id: 11, name: '11월', level: 3},
      {id: 12, name: '12월', level: 4},
    ]
  },
  {
    id: 3,
    year: 2024, 
    flowerSuccess: 2,
    flowerTotal: 7,
    flowers: [
      {id: 1, name: '1월', level: 2},
      {id: 2, name: '2월', level: 4},
      {id: 3, name: '3월', level: 3},
      {id: 4, name: '4월', level: 1},
      {id: 5, name: '5월', level: 2},
      {id: 6, name: '6월', level: 4},
      {id: 7, name: '7월', level: 1},
    ]
  }
]

function FamilyGardenPage () {
  const [statusYear, setStatusYear] = useState(2024)

  function nextYear () {
    setStatusYear(statusYear + 1)
  }

  function postYear () {
    setStatusYear(statusYear - 1)
  }

  const yearData = years.find(item => item.year === statusYear)

  return (
    <div className="w-full h-full box-border relative bg-cover flex flex-col items-center"
    style={{'backgroundImage': `url(${Background})`}}>
      <header style={{'height': '12vh'}}>
        <div className='flex justify-center w-64 h-20 bg-contain bg-no-repeat bg-center'
        style={{'backgroundImage': `url(${Header})`}}>
          <h1 className='text-2xl font-bold text-red-900 absolute top-8'>기억정원🌷</h1>
        </div>
      </header>
      <Garden year = {yearData.year} flowers={yearData.flowers}/>
      <YearStatus year = {yearData.year} total={yearData.flowerTotal} success={yearData.flowerSuccess} />
      <NavBar />
    </div>
  )
}

export default FamilyGardenPage;