import styles from '../../css/payment/payment.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import PaymentItem from './PaymentItem';
import PaymentModal from './PaymentModal';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePreparePayment, usePaymentItems } from '../../hook/payment/paymentHook';

const getImagePath = (imageName) => {
    return new URL(`../../assets/payment/${imageName}`, import.meta.url).href;
};

function PaymentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [paymentItems, setPaymentItems] = useState([]);

    const navigate = useNavigate();
    const { mutateAsync: preparePayment } = usePreparePayment();
    const { data, isLoading, error } = usePaymentItems();

    useEffect(() => {
        if (data) {
            console.log('Fetched payment items:', data.data);
            const itemsWithFullPath = data.data.map(item => ({
                ...item,
                image: getImagePath(item.image),
            }));
            setPaymentItems(itemsWithFullPath);
        }
    }, [data]);

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
            const respOfServer = await preparePayment({
                pointId: selectedItem.pointId
            });

            console.log(respOfServer);

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
                redirectUrl: REDIRECT_URL,
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading payment items</div>;
    }

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
                    {Array.isArray(paymentItems) && paymentItems.map((item, index) => (
                        <PaymentItem
                            key={index}
                            pointId={item.pointId}
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
