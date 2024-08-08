import { useQuery } from 'react-query';
import { fetchInventory, getMyInfo } from '../../service/user/userApi';

export const useInventory = () => {
    return useQuery({
        queryKey: ['inventory'],
        queryFn: fetchInventory,
    });
}

export const useMyInfo = () => {
    return useQuery({
        queryKey: ['myinfo'],
        queryFn: getMyInfo,
    })
}
