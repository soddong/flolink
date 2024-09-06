import {create} from 'zustand';

const scheduleStore = create((set) => ({
  tags: [
    {
      id: 1,
      value: 'CAKE',
      name: '생일',  
      color: '#E37C91',
    },
    {
      id: 2,
      value: 'BED',
      name: '휴식',
      color: '#85ABEA' 
    },
    {
      id: 3,
      value: 'RESTAURANT',
      name: '식사',
      color: '#6CCD57' 
    },
    {
      id: 4,
      value: 'CHECKBOOK',
      name: '시험', 
      color: '#D2AB86'
    },
    {
      id: 5,
      value: 'FLIGHT',
      name: '여행',
      color: '#FF9534' 
    },
    {
      id: 6,
      value: 'CELEBRATION',
      name: '행사', 
      color: '#DE80E0'
    },
    {
      id: 7,
      value: 'REDEEM',
      name: '명절',
      color: '#76DEB9' 
    },
    {
      id: 8,
      value: 'SCHEDULE',
      name: '기타',
      color: '#767676' 
    }
  ]
}))

export default scheduleStore;