import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {getMyUserRoomId, getRoomMemberInfos} from "../service/userroom/userroomApi.js"
import { getMyInfo } from '../service/user/userApi.js';

const userRoomStore = create(
    persist(
        (set, get) => ({
            roomId: null,
            userRoomId: null,
            roomDetail: null,
            myInfo: null,
            getRoomDetail: () => get().roomDetail,
            getRoomId: () => get().roomId,
            getMyInfo: () => get().myInfo,
            setRoomId: (roomId) => set({ roomId }),
            getUserRoomId: () => get().userRoomId,
            setUserRoomId: async(roomId) => {
                const userRoomId = await getMyUserRoomId(roomId);
                set({userRoomId});
            },
            setRoomDetail: async(roomId) => {
                const roomDetail = await getRoomMemberInfos(roomId);
                set({ roomDetail });
            },
            fetchUserInfo: async () => {
                const myInfo = await getMyInfo();
                set({ myInfo });
            }
        }),
        {
            name: 'userRoomStore', // 로컬 스토리지에 저장될 키 이름
            getStorage: () => localStorage, // 로컬 스토리지 사용
        }
    )
);

export default userRoomStore;