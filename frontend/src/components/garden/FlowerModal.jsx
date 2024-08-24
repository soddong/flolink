import style from '../../css/main/main_modals.module.css'
import movieFrame from '../../assets/garden/movie_frame.png'
import { useState, useEffect } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FamilyRank from './FamilyRank';
import { fetchHistorys } from '../../service/garden/gardenApi.js';
import userRoomStore from '../../store/userRoomStore.js';
import Photo from "../../assets/tamagochi/flower1.png"
import styled from "styled-components";

const dummy_photos = [
  {id: 0, imageUrl: Photo},
  {id: 1, imageUrl: Photo},
  {id: 2, imageUrl: Photo},
  {id: 3, imageUrl: Photo},
]

function FlowerModal ({ month, flower, setFlowerModal, flowerdata }) {
  const roomDetail = userRoomStore((state) => state.roomDetail)
  const [plantId, setPlantId] = useState(roomDetail?.data.plantSummaryResponse?.plantId)
  const [historyId, setHistoryId] = useState(flowerdata?.plantHistoryId)
  const [history, setHistory] = useState(null)
  const [rank, setRank] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (plantId && historyId) {
      fetchHistorys(plantId, historyId)
      .then(({data}) => {
        setRank(Array.from(data?.plantUserHistoryRespons).sort((a, b) => a.monthlyRank - b.monthlyRank))
        setHistory(data?.feedImageResponses.map((image, index) => (
          <div className='w-full h-64 bg-center bg-contain bg-no-repeat flex justify-center items-center'
            style={{'backgroundImage': `url(${movieFrame})`, 'backgroundSize': '100% 100%'}}
            key={index}>
              <img src={`https://flolink-s3.s3.ap-northeast-2.amazonaws.com/${image?.imageUrl}`} alt="dummy_photo"
              style={{'height': '72%', 'width': '93%'}} />
          </div>
        )))
      })
      .catch((e) => {
        console.log(e)
      })
    }
  }, [plantId, historyId])
  

  function handleChange(index) {
    setCurrentIndex(index);
  }

  function closeModal () {
    setFlowerModal()
  }

  return (
    <div className={`w-3/4 h-2/3 p-2 ${style.mainModal}`}>
      <span className="material-symbols-outlined absolute top-2 right-2"
        onClick={closeModal}>
          cancel
      </span>
      <p className='font-bold text-lg text-rose-400'>{roomDetail?.data.roomSummarizeResponse?.roomName}: {month}의 기록</p>
      <CarouselWrapper>
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          selectedItem={currentIndex}
          interval={4000}
          centerMode={true}
          onChange={handleChange}
          showIndicators={false}
          className='w-full h-full' >
          {history}
        </Carousel>
      </CarouselWrapper>
      <div className='w-full h-full overflow-y-auto'>
        {rank ? 
          rank.map((member, index) => (
            <FamilyRank key={index} member={member} />
          )) : (
            <p>Loading..</p>
          )
        }
      </div>
    </div>
  )
}

export default FlowerModal;

const CarouselWrapper = styled.div`
	width: 100%;
	height: 300px;
	margin: 8px;
`;