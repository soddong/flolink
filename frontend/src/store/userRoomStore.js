import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const userRoomStore = create(
    persist(
        (set, get) => ({
            roomId: null,
            getRoomId: () => get().roomId,
            setRoomId: (roomId) => set({ roomId })
        }),
        {
            name: 'userRoomStore', // 로컬 스토리지에 저장될 키 이름
            getStorage: () => localStorage, // 로컬 스토리지 사용
        }
    )
);

export default userRoomStore;