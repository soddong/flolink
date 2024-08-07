import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchItems = async () => {
  const { data } = await axiosCommonInstance.get('/store');
  return data;
};

export const fetchPaymentHistory = async () => {
  const { data } = await axiosCommonInstance.get('/payment/history')
  return data
};

export const fetchPurchaseHistory = async () => {
  const { data } = await axiosCommonInstance.get('/store/purchase/history')
  return data
}

export const purchaseItem = async (itemId) => {
  try {
      const response = await axiosCommonInstance.post(`/store/${itemId}/purchase`);
      return response.data;
  } catch (error) {
      throw error;
  }
};