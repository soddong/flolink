import YearSelect from "../../components/schedule/yearSelect";
import CalendarList from "../../components/schedule/CalendarList";
import NavBar from "../../components/common/nav_bar/NavBar";
import ScheduleList from "../../components/schedule/ScheduleList";

function SchedulePage () {
  return (
    <div className="w-full h-full box-border relative bg-custom-gradient flex flex-col items-center">
      <div className="w-full relative flex items-end" style={{'height': '5vh'}}>
        <div className="w-14 h-6 flex items-center justify-between absolute left-5">
          <span className="material-symbols-outlined text-white">
            arrow_back
          </span>
          <span className="material-symbols-outlined text-white">
            menu
          </span>
        </div>
      </div>
      {/* <YearSelect /> */}
      <CalendarList />
      <ScheduleList />
      <NavBar />
    </div>
  )
}

export default SchedulePage;