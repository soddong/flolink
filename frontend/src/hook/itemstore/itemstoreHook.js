import { useQuery } from 'react-query';
import { fetchItems, fetchPaymentHistory, fetchPurchaseHistory } from '../../service/itemstore/itemstoreApi';

export const useItems = () => {
  return useQuery({
    queryKey: ['items'],
    queryFn: fetchItems,
  });
};

export const usePaymentHistory = () => {
    return useQuery({
        queryKey: ['paymenthistory'],
        queryFn: fetchPaymentHistory,
    })
}

export const usePurchaseHistory = () => {
    return useQuery({
        queryKey: ['purchasehistory'],
        queryFn: fetchPurchaseHistory,
    })
}