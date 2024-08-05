import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchItems = async () => {
 const { data } = await axiosCommonInstance.get('/store');
  return data;
};

export const fetchPaymentHistory = async () => {
  const { data } = await axiosCommonInstance.get('/payments/history')
  return data
}

export const fetchPurchaseHistory = async () => {
  const { data } = await axiosCommonInstance.get('/store/purchase/history')
  return data
}