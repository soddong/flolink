import React, { useState } from 'react';
import SideBar from '../../components/common/side_bar/SideBar.jsx'
import NavBar from '../../components/common/nav_bar/NavBar.jsx';
import BackgroundPhoto from '../../assets/main/background_photo.png'
import MainPage from './MainPage';
import MyRoomPage from '../my_room/myRoomPage';
import SchedulePage from '../schedule/SchedulePage';
import FeedListPage from '../feed/FeedListPage';
import FamilyGardenPage from '../garden/FamilyGardenPage';
import Question from '../../components/main/today_question/Question';

function MainLayout() {
  const [currentPage, setCurrentPage] = useState('home');


  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <MainPage />;
      case 'myroom':
        return <MyRoomPage />;
      case 'schedule':
        return <SchedulePage />;
      case 'diary':
        return <FeedListPage />;
      case 'garden':
        return <FamilyGardenPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="w-full h-full box-border bg-gradient-to-b from-blue-300 to-sky-50 relative flex justify-center">
      <SideBar />
        {renderPage()}
      <NavBar setCurrentPage={setCurrentPage} currentPage={currentPage} />
      
    </div>
  );
}

export default MainLayout;