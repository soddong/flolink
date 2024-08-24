import React from 'react';
import NavBarItem from './NavBarItem';
import { useNavigate, useLocation } from 'react-router-dom'; 

function NavBar() {
  const NavBarItems = [
    { span: 'calendar_month', name: '가족 일정', page: 'schedule' },
    { span: 'newsmode', name: '일기장', page: 'feed' },
    { span: 'home', name: 'Home', page: 'home' },
    { span: 'deceased', name: '기억정원', page: 'garden' },
    { span: 'account_circle', name: '마이룸', page: 'myroom' }
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname === '/main' ? 'home' : location.pathname.split('/')[2];

  const handlePageChange = (page) => {
    navigate(page === 'home' ? '/main' : `/main/${page}`);
  };

  return (
    <div className="absolute bottom-0 w-full h-16 bg-white/75 box-border flex items-center justify-between py-1 px-5">
      {NavBarItems.map((item, index) => (
        <NavBarItem
          key={index}
          span={item.span}
          name={item.name}
          isActive={currentPage === item.page}
          onClick={() => handlePageChange(item.page)}
        />
      ))}
    </div>
  );
}

export default NavBar;