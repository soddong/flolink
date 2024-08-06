import styles from '../../css/payment/payment.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import coin1 from '../../assets/payment/coin1.png';
import coin2 from '../../assets/payment/coin2.png';
import coin3 from '../../assets/payment/coin3.png';
import coin4 from '../../assets/payment/coin4.png';
import PaymentItem from './PaymentItem';
import PaymentModal from './PaymentModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreparePayment } from '../../hook/payment/paymentHook';

function PaymentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const navigate = useNavigate();
    const { mutateAsync: preparePayment } = usePreparePayment();

    const paymentItems = [
        { image: coin1, points: '1000', price: '1000' },
        { image: coin2, points: '3000', price: '2800' },
        { image: coin3, points: '5000', price: '4600' },
        { image: coin4, points: '10000', price: '9000' },
    ];

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const openModal = (item) => {
        if (!isModalOpen) {
            setSelectedItem(item);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            setSelectedItem(null);
            setPaymentStatus(null);
        }, 300);
    };

    const handlePayment = async () => {
        const storeId = import.meta.env.VITE_PAYMENT_STORE_ID;
        const channelKey = import.meta.env.VITE_PAYMENT_CHANNEL_KEY;
        const REDIRECT_URL = import.meta.env.VITE_PAYMENT_REDIRECT_URL;

        try {
            // 서버에서 paymentId를 받아옴
            const respOfServer = await preparePayment({
                orderName: selectedItem.points,
                amount: selectedItem.price,
            });

            console.log(respOfServer)

            if (!respOfServer || !respOfServer.data.orderId) {
                throw new Error("Invalid response from preparePayment");
            }

            const response = await PortOne.requestPayment({
                storeId: storeId,
                channelKey: channelKey,
                paymentId: respOfServer.data.orderId,
                orderName: respOfServer.data.orderName,
                totalAmount: selectedItem.price,
                currency: 'CURRENCY_KRW',
                payMethod: 'CARD',
                redirectUrl: REDIRECT_URL, // 리디렉션 URL 추가
            });

            if (response.code != null) {
                return alert(response.message);
            }
            return true;
        } catch (error) {
            console.error('결제 요청 실패:', error.message);
            alert('결제 요청 중 오류가 발생했습니다.');
            return false;
        }
    };

    const processPayment = async () => {
        const result = await handlePayment();
        setPaymentStatus(result ? '결제가 완료되었습니다.' : '결제가 취소되었습니다.');
    };

    return (
        <div className={`${styles.payment} bg-custom-gradient`}>
            <PaymentModal 
                isOpen={isModalOpen}
                isClosing={isClosing}
                onClose={closeModal}
                selectedItem={selectedItem}
                paymentStatus={paymentStatus}
                onProcessPayment={processPayment}
            />

            <div className={styles.header}>
                <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={() => { navigate(-1); }} />
                <div className={styles.title}>
                    <span>결제하기</span>
                </div>
            </div>
            <div className={styles.userpoint}>
                OOO님의 보유 포인트 : 13123134pt
            </div>
            <div className={styles.list}>
                <li>
                    {paymentItems.map((item, index) => (
                        <PaymentItem
                            key={index}
                            image={item.image}
                            points={item.points}
                            price={item.price}
                            onClick={() => openModal(item)}
                        />
                    ))}
                </li>
            </div>
        </div>
    );
}

export default PaymentPage;
