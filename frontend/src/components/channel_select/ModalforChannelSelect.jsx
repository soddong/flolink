import React from 'react';
import styles from '../../css/channel_select/modalforchannelselect.module.css';
import {useEffect, useRef} from 'react';

function ModalforChannelSelect({ isOpen, onClose, onCreateFamily, onJoinFamily, channelStatus }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event.target.classList.contains(styles.modalOverlay)) {
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
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()} ref={modalRef}>
                {channelStatus === '선택' && (
                    <>
                        <h2 className={styles.modalTitle}>가족 선택</h2>
                        <button className={styles.modalButton} onClick={onCreateFamily}>가족 생성</button>
                        <button className={styles.modalButton} onClick={onJoinFamily}>가족 추가</button>
                    </>
                )}
                {channelStatus === '생성' && (
                    <>
                        <h2 className={styles.modalTitle}>가족 생성</h2>
                        <h3>가족방 이름</h3>
                        <input placeholder="여기에 입력"></input>
                        <h3>비밀번호</h3>
                        <input placeholder="000000"></input>
                        <button>가족 생성</button>
                    </>
                )}
                {channelStatus === '추가' && (
                    <>
                        <h2 className={styles.modalTitle}>가족 추가</h2>
                        <h3>가족방 번호</h3>
                        <input placeholder="여기에 입력"></input>
                        <h3>비밀번호</h3>
                        <input placeholder="000000"></input>
                        <button>가족 입장</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ModalforChannelSelect;