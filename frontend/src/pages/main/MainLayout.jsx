import { Outlet } from 'react-router-dom';
import SideBar from '../../components/common/side_bar/SideBar.jsx'
import NavBar from '../../components/common/nav_bar/NavBar.jsx';
import AnimatedLayout2 from '../animation/AnimatedLayout2.jsx';
import { useState } from 'react';

function MainLayout() {
  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <SideBar />
        <AnimatedLayout2>
          <Outlet />
        </AnimatedLayout2>
      <NavBar />
    </div>
  );
}

export default MainLayout;