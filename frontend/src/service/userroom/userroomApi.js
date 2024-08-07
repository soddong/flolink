import { axiosCommonInstance } from '../../apis/axiosInstance';

export const getMyUserRooms = async () => {
    const { data } = await axiosCommonInstance.get(`/rooms`)
    return data;
}

export const createUserRoom = async (roomCreateRequest) => {
    const { data } = await axiosCommonInstance.post(`/rooms`, roomCreateRequest);
    return data;
}
export const registerUserRoom = async (roomParticipateRequest) => {
    const { data } = await axiosCommonInstance.post(`/rooms/register`, roomParticipateRequest);
    return data;
}
export const getMyRoomRole = async (roomId) => {
    const { data } = await axiosCommonInstance.get(`/rooms/${roomId}/me/role`);
    return data;
}
export const getRoomMemberInfos = async (roomId) => {
    const { data } = await axiosCommonInstance.get(`/rooms/${roomId}`);
    return data;
}
export const updateRoomDetail = async (roomId, roomUpdateRequest) => {
    const { data } = await axiosCommonInstance.patch(`/rooms/${roomId}`, roomUpdateRequest);
    return data;
}
export const exitRoom = async (roomId) => {
    const { data } = await axiosCommonInstance.delete(`/rooms/${roomId}`,);
    return data;
}
export const kickRoomMember = async (roomId, targetUserRoomId) => {
    const { data } = await axiosCommonInstance.delete(`/rooms/${roomId}/kick/${targetUserRoomId}`,);
    return data;
}
export const updateRoomMemberNickname= async(nicknameUpdateRequest)=>{
    const {data} = await axiosCommonInstance.put(`/rooms/nickname/update`,nicknameUpdateRequest);
}
