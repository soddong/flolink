function FamilyRank ({name, rank, point}) {
  return (
    <div className="w-full h-1/6 bg-rose-300 rounded mb-2">
      <p>{name} {rank} {point}</p>
    </div>
  )
}

export default FamilyRank;