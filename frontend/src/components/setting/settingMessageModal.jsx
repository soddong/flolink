import styles from '../../css/setting/settingmodal.module.css';

function SettingMessageModal ({setShowMessageModal, setStatus, status}) {
    
    const handleContent = (e) => {
        setStatus(e.target.value)
    }
    
    return (
        <div className={styles.modalOverlay} onClick={() => {setShowMessageModal(false)}}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <input
                    value={status}
                    onChange={handleContent}
                >
                </input>
            </div>
        </div>
    )
}

export default SettingMessageModal;