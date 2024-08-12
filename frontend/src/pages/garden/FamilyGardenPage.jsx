import NavBar from '../../components/common/nav_bar/NavBar';
import Background from '../../assets/garden/garden_background.png'
import Header from '../../assets/garden/panel_head.png'
import Garden from '../../components/garden/Garden';
import YearStatus from '../../components/garden/YearStatus';
import { useState, useEffect } from 'react';
import { fetchYears } from '../../service/garden/gardenApi.js';
import userRoomStore from '../../store/userRoomStore.js';

const years = [
  {
    id: 1,
    "year": 2022, 
    "achievementCount": 5,
    "totalCount": 8,
    "data": {
      "plantHistorys": [
        {"plantHistoryId": 1, "dateMonth": "2022-06-02", "level": 4},
        {"plantHistoryId": 2, "dateMonth": "2022-07-02", "level": 1},
        {"plantHistoryId": 3, "dateMonth": "2022-08-02", "level": 4},
        {"plantHistoryId": 4, "dateMonth": "2022-09-02", "level": 4},
        {"plantHistoryId": 5, "dateMonth": "2022-10-02", "level": 4},
        {"plantHistoryId": 6, "dateMonth": "2022-11-02", "level": 2},
        {"plantHistoryId": 7, "dateMonth": "2022-12-02", "level": 4},
      ]
    }
  },
  {
    id: 2,
    "year": 2023, 
    "achievementCount": 10,
    "totalCount": 12,
    "data": {
      "plantHistorys": [
        {"plantHistoryId": 1, "dateMonth": '2023-01-02', "level": 4},
        {"plantHistoryId": 2, "dateMonth": '2023-02-02', "level": 4},
        {"plantHistoryId": 3, "dateMonth": '2023-03-02', "level": 3},
        {"plantHistoryId": 4, "dateMonth": '2023-04-02', "level": 4},
        {"plantHistoryId": 5, "dateMonth": '2023-05-02', "level": 4},
        {"plantHistoryId": 6, "dateMonth": '2023-06-02', "level": 4},
        {"plantHistoryId": 7, "dateMonth": '2023-07-02', "level": 4},
        {"plantHistoryId": 8, "dateMonth": '2023-08-02', "level": 4},
        {"plantHistoryId": 9, "dateMonth": '2023-09-02', "level": 4},
        {"plantHistoryId": 10, "dateMonth": '2023-10-02', "level": 4},
        {"plantHistoryId": 11, "dateMonth": '2023-11-02', "level": 3},
        {"plantHistoryId": 12, "dateMonth": '2023-12-02', "level": 4},
      ]
    }
  },
  {
    id: 3,
    "year": 2024, 
    "achievementCount": 2,
    "totalCount": 7,
    "data": {
      "plantHistorys": [
        {"plantHistoryId": 1, "dateMonth": '2024-01-02', "level": 2},
        {"plantHistoryId": 2, "dateMonth": '2024-02-02', "level": 4},
        {"plantHistoryId": 3, "dateMonth": '2024-03-02', "level": 3},
        {"plantHistoryId": 4, "dateMonth": '2024-04-02', "level": 1},
        {"plantHistoryId": 5, "dateMonth": '2024-05-02', "level": 2},
        {"plantHistoryId": 6, "dateMonth": '2024-06-02', "level": 4},
        {"plantHistoryId": 7, "dateMonth": '2024-07-02', "level": 1},
      ]
    }
  }
]

function FamilyGardenPage () {
  const [statusYear, setStatusYear] = useState(2024)
  const roomDetail = userRoomStore((state) => state.roomDetail)
  const [plantId, setPlantId] = useState(null)
  const [itemData, setItemData] = useState(null);

  useEffect (() => {
    console.log(roomDetail)
    setPlantId(roomDetail?.data.plantSummaryResponse?.plantId)
  },[])

  useEffect (() => {
    if (plantId) {
      fetchYears(plantId, statusYear)
      .then(({data}) => {
        console.log(data)
        setItemData(data)
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }, [plantId, statusYear])

  function nextYear () {
    setStatusYear(statusYear + 1)
  }

  function postYear () {
    setStatusYear(statusYear - 1)
  }

  return (
    <div className="w-full h-full box-border relative bg-cover flex flex-col items-center"
    style={{'backgroundImage': `url(${Background})`}}>
      <header style={{'height': '12vh'}}>
        <div className='flex justify-center w-64 h-20 bg-contain bg-no-repeat bg-center'
        style={{'backgroundImage': `url(${Header})`}}>
          <h1 className='text-2xl font-bold text-red-900 absolute top-8'>기억정원🌷</h1>
        </div>
      </header>
      {itemData ? (
        <>
          <Garden year = {statusYear} flowers={itemData["plantHistorys"]} nextYear={nextYear} postYear={postYear}/>
          <YearStatus year = {statusYear} total={itemData["totalCount"]} success={itemData["achievementCount"]} />
        </>) : (
          <p>Loading...</p>
        )}
      <NavBar />
    </div>
  )
}

export default FamilyGardenPage;