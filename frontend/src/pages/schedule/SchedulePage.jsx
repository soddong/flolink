import Calendar from "../../components/schedule/Calendar";
import NavBar from "../../components/common/nav_bar/NavBar";
import { useNavigate } from "react-router-dom";

function SchedulePage () {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full box-border relative bg-custom-gradient flex flex-col items-center">
      <div className="w-full relative flex items-end" style={{'height': '5vh'}}>
        <div className="w-14 h-6 flex items-center justify-between absolute left-5">
          <span className="material-symbols-outlined text-white"
          onClick={(() => navigate("/main"))}>
            arrow_back
          </span>
        </div>
      </div>
      <Calendar />
      <NavBar />
    </div>
  )
}

export default SchedulePage;