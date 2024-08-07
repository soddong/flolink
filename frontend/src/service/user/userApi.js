import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchInventory = async () => {
    const { data } = await axiosCommonInstance.get('/myroom/inventory');
    return data;
}

export const fetchMyroom = async () => {
    const { data } = await axiosCommonInstance.get('/myroom');
    return data;
}