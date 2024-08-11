import style from '../../css/main/main_modals.module.css'
import movieFrame from '../../assets/garden/movie_frame.png'
import { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FamilyRank from './FamilyRank';
import { getHistoryData } from '../../hook/garden/gardenHook.js'

const imageData = [1, 2, 3, 4, 5]
const family = [
  {id: 1, name: '엄마', rank: 1, point: 250},
  {id: 2, name: '엄마', rank: 3, point: 250},
  {id: 3, name: '엄마', rank: 2, point: 250},
  {id: 4, name: '엄마', rank: 4, point: 250},
]

function FlowerModal ({ month, flower, setFlowerModal }) {
  const [plantId, setPlantId] = useState(1)
  const [historyId, setHistoryId] = useState(5)
  const { data: historyData, isLoading: historyLoading, error: historyError } = getHistoryData(plantId, historyId);
  const [history, setHistory] = useState(null)
  const [rank, setRank] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (historyData && historyData.data) {
      setRank(Array.from(historyData.data["plantUserHistoryRespons"]).sort((a, b) => a.rank - b.rank))
      setHistory(historyData.data["feedImageResponses"].map((image, index) => (
        <div className='w-full h-full bg-center bg-contain bg-no-repeat flex justify-center items-center'
          style={{'backgroundImage': `url(${movieFrame})`, 'backgroundSize': '100% 100%'}}
          key={index}>
            <img src={image["imageUrl"]} alt="dummy_photo"
            style={{'height': '72%', 'width': '93%'}} />
        </div>
      )))

      console.log(history, rank)
    } else {
      console.log(historyError)
    }
  }, [historyData, historyLoading, historyError])

  function handleChange(index) {
    setCurrentIndex(index);
  }

  function closeModal () {
    setFlowerModal()
  }

  return (
    <div className={`w-3/4 h-3/4 p-2 ${style.mainModal}`}>
      <span className="material-symbols-outlined absolute top-2 right-2"
        onClick={closeModal}>
          cancel
      </span>
      <p className='font-bold text-lg text-rose-400'>꿀벌 가족🍯: {month}의 기록</p>
      <div className='w-full h-2/3 m-2'>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          selectedItem={currentIndex}
          interval={4000}
          centerMode={true}
          onChange={handleChange}
          className='w-full h-full' >
          {history}
        </Carousel>
      </div>
      <div className='w-full h-full'>
        {rank ? 
          rank.map((member, index) => (
            <FamilyRank key={index} name={member["nickname"]} rank={member["monthlyRank"]} point={member["contributeExp"]} />
          )) : (
            <p>Loading..</p>
          )
        }
      </div>
    </div>
  )
}

export default FlowerModal;