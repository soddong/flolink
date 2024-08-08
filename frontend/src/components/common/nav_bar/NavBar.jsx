import React from 'react';
import NavBarItem from './NavBarItem';

function NavBar({ setCurrentPage, currentPage }) {
  const NavBarItems = [
    { span: 'calendar_month', name: '가족 일정', page: 'schedule' },
    { span: 'newsmode', name: '일기장', page: 'diary' },
    { span: 'home', name: 'Home', page: 'home' },
    { span: 'deceased', name: '기억정원', page: 'garden' },
    { span: 'account_circle', name: '마이룸', page: 'myroom' }
  ];

  return (
    <div className="absolute bottom-0 w-full h-16 bg-white/75 box-border flex items-center justify-between py-1 px-5">
      {NavBarItems.map((item, index) => (
        <NavBarItem
          key={index}
          span={item.span}
          name={item.name}
          isActive={currentPage === item.page}
          onClick={() => setCurrentPage(item.page)}
        />
      ))}
    </div>
  );
}

export default NavBar;