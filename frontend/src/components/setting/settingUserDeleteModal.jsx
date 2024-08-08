import styles from '../../css/setting/settingmodal.module.css';
import { deleteUser } from '../../service/user/userApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

function SettingUserDeleteModal ({setShowUserDeleteModal}) {

    const navigate = useNavigate(); 
    const [deleteTitle, setDeleteTitle] = useState('정말 탈퇴하시겠습니까?')
    const [showButtons, setShowButtons] = useState(true);

    const handleDeleteUser = async () => {
       try {
        await deleteUser();
        navigate('/');
       }
       catch (error) {
        setDeleteTitle('탈퇴에 실패했습니다.');
        setShowButtons(false)
       }
    }

    return (
        <div className={styles.modalOverlay} >
            <div className={styles.modalContent} onClick={() => {setShowUserDeleteModal(false)}}>
                <h2 className={styles.userDeletetitle}>{deleteTitle}</h2>
                {showButtons && (  
                    <div className={styles.buttons}>
                        <button onClick={handleDeleteUser}>네</button>
                        <button onClick={() => {setShowUserDeleteModal(false)}}>아니오</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SettingUserDeleteModal;