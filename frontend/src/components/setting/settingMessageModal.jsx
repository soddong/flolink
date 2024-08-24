import styles from '../../css/setting/settingmodal.module.css';
import { changeStatusMessage } from '../../service/user/userApi';

function SettingMessageModal ({setShowMessageModal, setStatus, status}) {
    
    const handleContent = (e) => {
        setStatus(e.target.value)
    }

    const handleSaveStatus = async () => {
        try {
            await changeStatusMessage(status);
        }
        catch(error) {
            console.log(error)
        }
        finally {
            setShowMessageModal(false)
        }
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
                    <button className={styles.saveButtonnick} onClick={handleSaveStatus}>수정</button>

                </div>
            </div>
        </div>
    )
}

export default SettingMessageModal;