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

function PaymentPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);

    const navigate = useNavigate();

    const paymentItems = [
        { image: coin1, points: '1,000', price: '1,000' },
        { image: coin2, points: '3,000', price: '2,800' },
        { image: coin3, points: '5,000', price: '4,600' },
        { image: coin4, points: '10,000', price: '9,000' },
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
        // 여기에 나중에 결제 처리 할것
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.random() > 0.5);
            }, 1000);
        });
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
                <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate(-1)}}/>
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
    )
}

export default PaymentPage;