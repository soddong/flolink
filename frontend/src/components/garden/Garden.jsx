import Fence from '../../assets/garden/fence.png'
import YearPanel from '../../assets/garden/panel_year.png'

const months = [
  {id: 1, name: '1월', image: 'winter2'},
  {id: 2, name: '2월', image: 'winter3'},
  {id: 3, name: '3월', image: 'spring1'},
  {id: 4, name: '4월', image: 'spring2'},
  {id: 5, name: '5월', image: 'spring3'},
  {id: 6, name: '6월', image: 'summer1'},
  {id: 7, name: '7월', image: 'summer2'},
  {id: 8, name: '8월', image: 'summer3'},
  {id: 9, name: '9월', image: 'fall1'},
  {id: 10, name: '10월', image: 'fall2'},
  {id: 11, name: '11월', image: 'fall3'},
  {id: 12, name: '12월', image: 'winter1'},
]

function Garden () {
  return (
    <div className="w-full flex justify-center items-center relative" 
    style={{'height': '60vh'}}>
      <div className="w-3/4 h-1/6 absolute top-0 bg-repeat-round flex items-center justify-center z-10" 
      style={{'backgroundImage': `url(${Fence})`}}>
        <div className='w-32 h-10 bg-contain bg-no-repeat bg-center flex items-center justify-center'
        style={{'backgroundImage': `url(${YearPanel})`}}>
          <p className='text-orange-900 text-lg font-bold'>2024년</p>
        </div>
      </div>
      <div className="w-3/4 h-4/5 rounded-lg py-7 px-2" 
      style={{'backgroundColor': '#EBD4BF', 'filter': 'drop-shadow(0px 10px #D2AB86)'}}>
        hello
      </div>
      <span class="material-symbols-outlined absolute left-1 text-4xl text-white/80"
      style={{'fontVariationSettings': '"FILL" 1'}}>
      arrow_circle_left
      </span>
      <span class="material-symbols-outlined absolute right-1 text-4xl text-white/80"
      style={{'fontVariationSettings': '"FILL" 1'}}>
      arrow_circle_right
      </span>
    </div>
  )
}

export default Garden;