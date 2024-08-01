import { useState, useEffect } from "react"

const options = [
  {
    id: 1,
    value: 'cake',
    name: '생일',  
    color: '#E37C91',
  },
  {
    id: 2,
    value: 'bed',
    name: '휴식',
    color: '#85ABEA' 
  },
  {
    id: 3,
    value: 'restaurant',
    name: '식사',
    color: '#6CCD57' 
  },
  {
    id: 4,
    value: 'checkbook',
    name: '시험', 
    color: '#D2AB86'
  },
  {
    id: 5,
    value: 'flight',
    name: '여행',
    color: '#FF9534' 
  },
  {
    id: 6,
    value: 'celebration',
    name: '행사', 
    color: '#DE80E0'
  },
  {
    id: 7,
    value: 'redeem',
    name: '명절',
    color: '#76DEB9' 
  },
  {
    id: 8,
    value: 'schedule',
    name: '기타',
    color: '#767676' 
  }
]

function TagSelect (props) {
  const [iconValue, setIconValue] = useState(props.icon)
  const [tagValue, setTagValue] = useState(props.tag)
  const [colorValue, setColorValue] = useState(props.color)

  useEffect(() => {
    const icon = options.find(option => option.value === iconValue);
    if (icon) {
      setTagValue(icon.name);
      setColorValue(icon.color);
    }
  }, [iconValue]);

  useEffect(() => {
    console.log(props)
    props.handleIconChange(iconValue);
    props.handleInputTagChange(tagValue);
    props.handleColorChange(colorValue);
  }, [iconValue, tagValue, colorValue]);

  function setValue(event) {
    setIconValue(event.target.value);
  }

  return (
    <select defaultValue={props.icon} className="w-20 h-7 rounded border-0 ring-1 ring-inset ring-gray-400 p-1 text-base"
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