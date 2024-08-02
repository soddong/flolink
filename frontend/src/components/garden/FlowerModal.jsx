import style from '../../css/main/main_modals.module.css'
import movieFrame from '../../assets/garden/movie_frame.png'
import { useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import FamilyRank from './FamilyRank';

const imageData = [1, 2, 3, 4, 5]
const family = [
  {id: 1, name: '엄마', rank: 1, point: 250},
  {id: 2, name: '엄마', rank: 3, point: 250},
  {id: 3, name: '엄마', rank: 2, point: 250},
  {id: 4, name: '엄마', rank: 4, point: 250},
]

function FlowerModal ({ month, flower }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedslides = imageData.map((image, index) => (
    <div className='w-full h-full bg-center bg-contain bg-no-repeat flex justify-center items-center'
      style={{'backgroundImage': `url(${movieFrame})`, 'backgroundSize': '100% 100%'}}
      key={index}>
        <img src={flower} alt="dummy_photo"
        style={{'height': '72%', 'width': '93%'}} />
    </div>
  ));

  function handleChange(index) {
    setCurrentIndex(index);
  }

  const copyOfFamily = Array.from(family)
  const sortedFamily = copyOfFamily.sort((a, b) => a.rank - b.rank)

  return (
    <div className={`w-3/4 h-3/4 p-2 ${style.mainModal}`}>
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
          {feedslides}
        </Carousel>
      </div>
      <div className='w-full h-full'>
        {sortedFamily.map((member) => (
          <FamilyRank key={member.id} name={member.name} rank={member.rank} point={member.point} />
        ))}
      </div>
    </div>
  )
}

export default FlowerModal;