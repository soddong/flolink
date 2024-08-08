import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const mainStore = create(
    persist (
        (set, get) => ({
            currentPage: 'home',
            currentData: null,
            
            setCurrentPage: (page) => set({ currentPage: page }),

            setCurrentData: (data) => set({ currentData: data }),
        }),
        {
            name: 'mainStore', 
            getStorage: () => localStorage, 
        }
    )
)

export default mainStore;