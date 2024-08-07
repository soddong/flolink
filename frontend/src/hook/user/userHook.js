import { useQuery } from 'react-query';
import { fetchInventory } from '../../service/user/userApi';

export const useInventory = () => {
    return useQuery({
        queryKey: ['inventory'],
        queryFn: fetchInventory,
    });
}

// export const useMyroom = () => {
//     return useQuery({
//         queryKey: ['myroom'],
//         queryFn: fetchMyroom,
//     })
// }