import { useMutation } from 'react-query';
import { preparePayment, completePayment } from '../../service/payment/paymentApi';

export const usePreparePayment = () => {
    return useMutation(({ orderName, amount }) => preparePayment(orderName, amount));
};

export const useCompletePayment = () => {
    return useMutation(({ paymentKey, orderId }) => completePayment(paymentKey, orderId));
};
