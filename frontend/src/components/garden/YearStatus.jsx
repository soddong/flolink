import { useState, useEffect } from "react";

function YearStatus ({year, total, success}) {
  const [comment, setComment] = useState()
  const score = success / total
  
  useEffect (() => {
    if (score < 0.4) {
      setComment('이번 해는 소통이 적었어요ㅠㅠ')
    } else if (score < 0.7) {
      setComment('예쁜 정원이네요!')
    } else {
      setComment('이번 해는 소통이 활발했네요. 정원이 꽉 찼어요!')
    }
  }, [score])

  return (
    <div className="w-3/4 bg-white/50 rounded-lg flex items-center justify-center"
    style={{'height': '10vh', 'boxShadow': '0px 0px 10px 0px #00000034'}}>
      <div className="text-sm text-gray-700 text-center">
        {total ? (
          <>
            <p>{year}년 통계</p>
            <p>개화 성공률: {success}/{total}</p>
            <p>{comment}</p>
          </> ) : (
            <p>해당 년도의 기록이 없어요.</p>
          )}
      </div>
    </div>
  )
}

export default YearStatus;