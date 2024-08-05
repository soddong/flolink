import { useQuery } from 'react-query';
import { axiosCommonInstance } from '../../apis/axiosInstance';


const fetchItems = async () => {
 const { data } = await axiosCommonInstance.get('/store');
  return data;
};

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
};