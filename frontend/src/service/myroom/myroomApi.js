import { axiosCommonInstance } from '../../apis/axiosInstance';

export const myInventory = async () => {
    const { data } = await axiosCommonInstance.get('/myroom/inventory');
    return data;
}

export const mycurRoom = async () => {
    const { data } = await axiosCommonInstance.get('/myroom');
    return data;
}