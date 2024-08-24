import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const mainStore = create(
    persist (
        (set, get) => ({
            currentPage: 'home',
            currentData: null,
            alarms: [],
            readAlarms: [],
            
            setCurrentPage: (page) => set({ currentPage: page }),

            setCurrentData: (data) => set({ currentData: data }),

            setAlarms: (alarms) => set({ alarms: alarms }),

            addReadAlarm: (id) => {
                const updatedReadAlarms = [...get().readAlarms, id];
                set({ readAlarms: updatedReadAlarms });
            },

            markAllAlarmsAsRead: () => {
                const allAlarmIds = get().alarms.map(alarm => alarm.id);
                set({ readAlarms: allAlarmIds });
            }
        }),
        {
            name: 'mainStore', 
            getStorage: () => localStorage, 
        }
    )
)

export default mainStore;

export const questionStore = create((set) => ({
    questions : [
        {
            id: 1,
            content: '오늘 기분은 어떤가요?'
        },
        {
            id: 2,
            content: '오늘 먹은 음식 중 가장 맛있었던 것은?'
        },
        {
            id: 3,
            content: '오늘 있었던 특별한 일이나 재미있는 순간을 공유해 주세요.'
        },
        {
            id: 4,
            content: '최근에 가족과의 활동 중 가장 기억에 남는 순간이 있나요?'
        },
        {
            id: 5,
            content: '오늘 하루 중 가장 기억에 남는 순간은?'
        },
        {
            id: 6,
            content: '최근에 읽은 책 중 추천할 만한 것이 있나요?'
        },
        {
            id: 7,
            content: '오늘의 날씨는 어땠나요?'
        },
        {
            id: 8,
            content: '최근에 찍은 가족 사진이 있다면 공유해 주세요!'
        },
        {
            id: 9,
            content: '오늘 새로운 것을 배운 게 있나요?'
        },
        {
            id: 10,
            content: '최근에 가족과 함께 하고 싶은 활동은?'
        },
        {
            id: 11,
            content: '오늘 느낀 감정이나 생각을 공유해 보세요.'
        },
        {
            id: 12,
            content: '요즘 관심 있는 취미나 활동이 있나요?'
        },
        {
            id: 13,
            content: '최근에 만든 요리 중 자랑하고 싶은 것이 있다면?'
        },
        {
            id: 14,
            content: '오늘의 스트레스를 해소한 방법은?'
        },
        {
            id: 15,
            content: '최근에 다녀온 곳 중 추천하고 싶은 장소가 있나요?'
        },
        {
            id: 16,
            content: '최근에 찍은 특별한 순간이 있다면 공유해 주세요.'
        },
        {
            id: 17,
            content: '오늘의 일상에서 가장 힘들었던 점은 무엇이었나요?'
        },
        {
            id: 18,
            content: '오늘의 소망이나 목표를 적어 주세요.'
        },
        {
            id: 19,
            content: '최근 나의 목표 중 하나는 무엇인가요?'
        },
        {
            id: 20,
            content: '오늘의 식사 중 가장 기억에 남는 음식을 올려 주세요.'
        },
        {
            id: 21,
            content: '가족에게 전하고 싶은 메시지가 있나요?'
        },
        {
            id: 22,
            content: '오늘 가장 즐거운 순간을 공유해 주세요.'
        },
        {
            id: 23,
            content: '오늘의 가장 큰 성취는 무엇인가요?'
        },
        {
            id: 24,
            content: '오늘의 기분을 색깔로 표현해 보세요.'
        },
    ]
}))