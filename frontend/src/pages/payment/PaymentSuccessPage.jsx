import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCompletePayment } from '../../hook/payment/paymentHook';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { mutateAsync: completePayment } = useCompletePayment();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const paymentKey = searchParams.get('txId');
        const orderId = searchParams.get('paymentId');
        const code = searchParams.get('code');
        const message = searchParams.get('message');

        const handleCompletePayment = async () => {
            try {
                await completePayment({ paymentKey, orderId, code });
                if (code != (null || undefined)) {
                    alert(message);
                    navigate('/itemstore', { replace : true });
                    return;
                }
                alert('결제가 완료되었습니다.');
                navigate('/itemstore', { replace : true }); 
            } catch (error) {
                console.error('결제 완료 처리 중 오류가 발생했습니다:', error);
                alert('결제가 실패했습니다.');
                navigate('/itemstore', { replace : true }); 
            }
        };

        if (paymentKey && orderId) {
            handleCompletePayment();
        }
    }, [location, navigate, completePayment]);

    return <div>결제 중...</div>;
};

export default PaymentSuccessPage;
