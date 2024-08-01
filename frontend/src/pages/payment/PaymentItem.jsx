import React from 'react';
import styles from '../../css/payment/payment.module.css';

function PaymentItem({ image, points, price, onClick }) {
  return (
    <ul onClick={onClick}>
      <img src={image} alt={`${points} points`} />
      <div className={styles.point}>
        <span>{points}pt</span>
        <span>₩ {price}</span>
      </div>
    </ul>
  );
}

export default PaymentItem;