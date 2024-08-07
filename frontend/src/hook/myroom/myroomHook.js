import { useMutation } from 'react-query';
import { yourMyroom, fetchEquip, fetchUnequip } from '../../service/myroom/myroomApi';

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

export const useEquip = () => {
  return useMutation({
    mutationFn : (hasItemId) => fetchEquip(hasItemId),
    onSuccess: (data) => {
      
      console.log('Myroom data fetched successfully:', data);
    },
    onError: (error) => {
      
      console.error('Error fetching myroom data:', error);
    },
  })
}

export const useUnequip = () => {
  return useMutation({
    mutationFn : (itemType) => fetchUnequip(itemType),
    onSuccess: (data) => {
      
      console.log('Myroom data fetched successfully:', data);
    },
    onError: (error) => {
      
      console.error('Error fetching myroom data:', error);
    },
  })
}