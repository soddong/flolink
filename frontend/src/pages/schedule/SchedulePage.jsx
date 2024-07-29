import YearSelect from "../../components/schedule/yearSelect";
import CalendarList from "../../components/schedule/CalendarList";

function SchedulePage () {
  return (
    <div className="w-full h-full box-border bg-custom-gradient relative flex flex-col items-center">
      <div className="w-14 h-6 flex items-center justify-between absolute left-5 top-5">
        <span className="material-symbols-outlined text-white">
          arrow_back
        </span>
        <span className="material-symbols-outlined text-white">
          menu
        </span>
      </div>
      <YearSelect />
      <CalendarList />
    </div>
  )
}

export default SchedulePage;