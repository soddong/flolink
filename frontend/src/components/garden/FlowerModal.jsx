import style from '../../css/main/main_modals.module.css'
import movieFrame from '../../assets/garden/movie_frame.png'
import { useState } from 'react';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageData = [1, 2, 3, 4, 5]

function FlowerModal ({ month, flower }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedslides = imageData.map((image, index) => (
    <div className='w-full h-full bg-center bg-contain bg-no-repeat flex justify-center items-center'
      style={{'backgroundImage': `url(${movieFrame})`}}
      key={index}>
        <img src={flower} alt="dummy_photo"
        style={{'height': '72%', 'width': '93%'}} />
    </div>
  ));

  function handleChange(index) {
    setCurrentIndex(index);
  }

  return (
    <div className={`w-3/4 h-3/4 p-2 ${style.mainModal}`}>
      <p className='font-bold text-lg text-rose-400'>꿀벌 가족🍯: {month}의 기록</p>
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        selectedItem={currentIndex}
        interval={4000}
        centerMode={true}
        onChange={handleChange} >
        {feedslides}
      </Carousel>
    </div>
  )
}

export default FlowerModal;