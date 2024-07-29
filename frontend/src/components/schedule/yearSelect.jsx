function YearSelect () {
  const years = [
    {value: 2022, name:'2022년'},
    {value: 2023, name:'2023년'},
    {value: 2024, name:'2024년'}
  ]
  return (
    <select defaultValue={2024} className="w-24 m-4 p-1 border-2 border-white/8 bg-inherit font-bold text-lg text-white">
      {years.map((year) => {
        return (
          <option key={year.value} value={year.value} className="text-black transition-all duration-700 ease-in-out">
            {year.name}
          </option>
        )
      })}
    </select>
  )
}

export default YearSelect;