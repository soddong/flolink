import { useState, useEffect } from "react"
import scheduleStore from "../../store/scheduleStore"

const options = [
  {
    id: 1,
    value: 'CAKE',
    name: '생일',  
    color: '#E37C91',
  },
  {
    id: 2,
    value: 'BED',
    name: '휴식',
    color: '#85ABEA' 
  },
  {
    id: 3,
    value: 'RESTAURANT',
    name: '식사',
    color: '#6CCD57' 
  },
  {
    id: 4,
    value: 'CHECKBOOK',
    name: '시험', 
    color: '#D2AB86'
  },
  {
    id: 5,
    value: 'FLIGHT',
    name: '여행',
    color: '#FF9534' 
  },
  {
    id: 6,
    value: 'CELEBRATION',
    name: '행사', 
    color: '#DE80E0'
  },
  {
    id: 7,
    value: 'REDEEM',
    name: '명절',
    color: '#76DEB9' 
  },
  {
    id: 8,
    value: 'SCHEDULE',
    name: '기타',
    color: '#767676' 
  }
]

function TagSelect (props) {
  const [iconValue, setIconValue] = useState(props.value)
  const [tagValue, setTagValue] = useState(props.value)
  const [colorValue, setColorValue] = useState(props.color)
  const tags = scheduleStore((state) => state.tags);

  useEffect(() => {
    const icon = tags.find(option => option.value === iconValue);
    if (icon) {
      setTagValue(icon.value);
      setColorValue(icon.color);
    }
  }, [iconValue]);

  useEffect(() => {
    props.handleIconChange(iconValue);
    props.handleInputTagChange(tagValue);
    props.handleColorChange(colorValue);
  }, [iconValue, tagValue, colorValue]);

  function setValue(event) {
    setIconValue(event.target.value);
  }

  return (
    <select defaultValue={props.value} className="w-20 h-7 rounded border-0 ring-1 ring-inset ring-gray-400 p-1 text-base"
    onChange={setValue}>
      {options.map((option) => {
        return (
          <option key={option.value} value={option.value} className="text-black transition-all duration-700 ease-in-out">
            {option.name}
          </option>
        )
      })}
    </select>
  )
}

export default TagSelect;