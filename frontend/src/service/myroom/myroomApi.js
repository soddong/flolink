import { axiosCommonInstance } from '../../apis/axiosInstance';

export const yourMyroom = async (userRoomId) => {
    const { data } = await axiosCommonInstance.post('/myroom', { userRoomId });
    return data;
}

export const fetchEquip = async (hasItemId) => {
    const { data } = await axiosCommonInstance.post(`/myroom/equip?hasItemId=${hasItemId}`);
    return data;
}

export const fetchUnequip = async (itemType) => {
    const { data } = await axiosCommonInstance.post(`/myroom/unequip?itemType=${itemType}`);
    return data;
}