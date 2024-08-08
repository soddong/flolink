import styles from '../../css/setting/settingmodal.module.css';

function SettingMessageModal ({setShowMessageModal, setStatus, status}) {
    
    const handleContent = (e) => {
        setStatus(e.target.value)
    }
    
    return (
        <div className={styles.modalOverlay} onClick={() => {setShowMessageModal(false)}}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.inputNickname}>
                    <div className={styles.inputWrapper}>
                        <input
                            value={status}
                            onChange={handleContent}
                            className={styles.nicknameInput}
                        >
                        </input>

                    </div>
                    <button className={styles.saveButtonnick}>수정</button>

                </div>
            </div>
        </div>
    )
}

export default SettingMessageModal;