import { axiosCommonInstance } from '../../apis/axiosInstance';

export const preparePayment = async (orderName, amount) => {
    const { data } = await axiosCommonInstance.post('/payments/prepare', {
        orderName,
        amount,
    });
    return data;
};

export const completePayment = async (paymentKey, orderId) => {
    const { data } = await axiosCommonInstance.post('/payments/complete', {
        paymentKey,
        orderId,
    });
    return data;
};
