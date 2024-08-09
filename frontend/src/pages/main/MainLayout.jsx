import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/side_bar/SideBar.jsx'
import NavBar from '../../components/common/nav_bar/NavBar.jsx';

function MainLayout() {

  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <SideBar />
        <Outlet />
      <NavBar />
    </div>
  );
}

export default MainLayout;