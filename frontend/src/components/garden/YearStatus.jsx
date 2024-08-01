function YearStatus ({year, total, success, feedCount}) {
  return (
    <div className="w-3/4 bg-white/50 rounded-lg flex items-center justify-center"
    style={{'height': '10vh', 'boxShadow': '0px 0px 10px 0px #00000034'}}>
      <div className="text-sm text-gray-700">
        <p>{year}년 통계</p>
        <p>개화 성공률: {success}/{total}</p>
        <p>작성된 피드 개수: {feedCount}개</p>
      </div>
    </div>
  )
}

export default YearStatus;