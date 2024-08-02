import React, { useState } from 'react';
import styles from '../../css/setting/settingmodal.module.css';

function SettingNicknameModal({nickname, setShowNicknameModal, setNickname}) {
    const [inputNickname, setInputNickname] = useState('');

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 8) {
            setInputNickname(value);
        }
    };

    const handleSave = () => {
        if (inputNickname.trim()) {
            setNickname(inputNickname);
            setShowNicknameModal(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={()=>setShowNicknameModal(false)}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.selectAnimalTitle}>
                    <span>닉네임을 입력해주세요. (최대 8자)</span>
                </div>
                <div className={styles.inputNickname}>
                    <div className={styles.inputWrapper}>
                        <input 
                            placeholder={nickname}
                            value={inputNickname}
                            onChange={handleInputChange}
                            className={styles.nicknameInput}
                            maxLength={8}
                        />
                        <span className={styles.charCount}>{inputNickname.length}/8</span>
                    </div>
                    <button 
                        className={styles.saveButtonnick} 
                        disabled={!inputNickname.trim()}
                        onClick={handleSave}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingNicknameModal;