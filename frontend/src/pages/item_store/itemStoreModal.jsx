import React from 'react';
import styles from '../../css/payment/payment.module.css';
import {useEffect,useRef} from 'react';


function ItemStoreModal({ isOpen, isClosing, onClose, processPurchase, purchaseStatus, imgSrc }) {
    
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div 
            className={`${styles.modal} ${styles.modalOpen} ${isClosing ? styles.modalClosing : ''}`}
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
        >
                {purchaseStatus ? (
                    <div className={`${styles.modalContent} ${isClosing ? styles.modalContentClosing : ''}`}> 
                        <p>{purchaseStatus}</p>
                        <button onClick={onClose}>닫기</button>
                    </div>
                ) : (
                    <div className={`${styles.modalContent} ${isClosing ? styles.modalContentClosing : ''}`}>
                       
                        <img src={imgSrc} className={styles.modalImg}/>
                        <p>정말 결제하시겠습니까?</p>
                        <p>
                            <button onClick={processPurchase}>결제</button>
                            &nbsp;&nbsp;/&nbsp;&nbsp;
                            <button onClick={onClose}>취소</button>
                        </p>
                    </div>
                )}
            
        </div>
    );
}

export default ItemStoreModal;