import React from 'react';
import styles from '../../css/channel_select/modalforchannelselect.module.css';

function ModalforChannelSelect({ isOpen, onClose, onCreateFamily, onJoinFamily }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>가족 선택</h2>
        <button className={styles.modalButton} onClick={onCreateFamily}>가족 생성</button>
        <button className={styles.modalButton} onClick={onJoinFamily}>가족 추가</button>
        <button className={styles.closeButton} onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ModalforChannelSelect;