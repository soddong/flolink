import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const tokenStore = create(
    persist(
        (set, get) => ({
            token : null,
            getToken: () => get().token,
            setToken: (token) => set({token})
            
        }),
        {
            name: 'tokenStore', // 로컬 스토리지에 저장될 키 이름
            getStorage: () => localStorage, // 로컬 스토리지 사용
        }
    )
);

export default tokenStore;