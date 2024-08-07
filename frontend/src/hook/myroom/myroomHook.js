import { useMutation } from 'react-query';
import { yourMyroom } from '../../service/myroom/myroomApi';

export const useYourMyroom = () => {
  return useMutation({
    mutationFn: (userRoomId) => yourMyroom(userRoomId),
    onSuccess: (data) => {
      
      console.log('Myroom data fetched successfully:', data);
    },
    onError: (error) => {
      
      console.error('Error fetching myroom data:', error);
    },
  });
};