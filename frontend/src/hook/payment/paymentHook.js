import { useMutation, useQuery } from 'react-query';
import { preparePayment, completePayment, fetchPaymentItems } from '../../service/payment/paymentApi';

export const usePaymentItems = () => {
    return useQuery({
        queryFn: fetchPaymentItems
    });
};

export const usePreparePayment = () => {
    return useMutation(({ pointId }) => preparePayment(pointId));
};

export const useCompletePayment = () => {
    return useMutation(({ paymentKey, orderId , code}) => completePayment(paymentKey, orderId, code));
};
