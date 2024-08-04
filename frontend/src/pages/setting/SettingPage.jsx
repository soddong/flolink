import styles from '../../css/setting/settingpage.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ddaomleft from '../../assets/setting/ddaom_left.png';
import ddaomright from '../../assets/setting/ddaom_right.png';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import SettingModal from '../../components/setting/settingModal';
import SettingNicknameModal from '../../components/setting/settingNicknameModal';
import SettingMessageModal from '../../components/setting/settingMessageModal';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SettingPage() {
    const [animal, setAnimal] = useState(null);
    const [nickname, setNickname] = useState('닉네임');
    const [curpoint, setCurpoint ] = useState(123143);
    const [status, setStatus] = useState('여기는 상메입니여기는 상메입니여기는 상메입니여기는 상메입니');
    const [showModal, setShowModal] = useState(false);
    const [showNicknameModal, setShowNicknameModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);

    const navigate = useNavigate();

    return (
        <div className={styles.setting}>
            {showModal && <SettingModal setShowModal={setShowModal} setAnimal={setAnimal} />}
            {showNicknameModal && <SettingNicknameModal nickname={nickname} setShowNicknameModal={setShowNicknameModal} setNickname={setNickname}/>}
            {showMessageModal && <SettingMessageModal />}
            <div className={styles.header}>
                <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate(-1)}}/>
                <div className={styles.title}>
                    <span>설정</span>
                </div>
            </div>
            <div className={styles.userinfo}>
                <div className= {styles.profile}>
                    <button className={styles.logout}>로그아웃</button>
                    <div className={styles.profileimages} >
                        <img 
                            src={animal} 
                            className={styles.userprofileimage} 
                            onClick={() => setShowModal(true)}
                        />
                        <AddAPhotoIcon className={styles.addphoto} color="disabled"/>
                    </div>
                    <div className={styles.username}>
                        <span className={styles.name}>{nickname}<EditIcon color="action" className={styles.editicon} onClick={()=>setShowNicknameModal(true)}/></span>
                        <span className={styles.point}>보유포인트 : {curpoint}pt<AddCircleOutlineIcon color="action" className={styles.addpoint}/></span>
                    </div>
                </div>
                <div className={styles.message}>
                    <div className={styles.realmessage}>
                        <img src={ddaomleft} className={styles.ddaomleft}/>
                        <button className={styles.editmessage} onClick={()=>setShowMessageModal(true)}>수정</button>
                        <div className={styles.statusmessage}>{status}</div>
                        <img src={ddaomright} className={styles.ddaomright}/>
                    </div>
                </div>
            </div>
            <div className={styles.settingContent}>
                <div className={styles.settingItem}>
                    <span className={styles.settingText}>비밀번호 수정</span>
                    <span className={styles.settingArrow}>›</span>
                </div>
                <div className={styles.settingItem}>
                    <span className={`${styles.settingText} ${styles.dangerText}`}>회원 탈퇴</span>
                    <span className={styles.settingArrow}>›</span>
                </div>
            </div>
        </div>
    )
}

export default SettingPage;