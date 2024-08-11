import { axiosCommonInstance } from '../../apis/axiosInstance';

export const fetchPaymentItems = async () => {
    const { data } = await axiosCommonInstance.get('/payment/items');
    return data;
};

export const preparePayment = async (pointId) => {
    const { data } = await axiosCommonInstance.post('/payment/prepare', {
        pointId
    });
    return data;
};

export const completePayment = async (paymentKey, orderId) => {
    const { data } = await axiosCommonInstance.post('/payment/complete', {
        paymentKey,
        orderId,
    });
    return data;
};
