import { axiosCommonInstance } from '../../apis/axiosInstance';

export const yourMyroom = async (userRoomId) => {
    const { data } = await axiosCommonInstance.post('/myroom', { userRoomId });
    return data;
}