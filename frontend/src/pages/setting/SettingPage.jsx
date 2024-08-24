import styles from '../../css/setting/settingpage.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import ddaomleft from '../../assets/setting/ddaom_left.png';
import ddaomright from '../../assets/setting/ddaom_right.png';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import { pink } from '@mui/material/colors';

import SettingModal from '../../components/setting/settingModal';
import SettingNicknameModal from '../../components/setting/settingNicknameModal';
import SettingMessageModal from '../../components/setting/settingMessageModal';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingUserDeleteModal from '../../components/setting/settingUserDeleteModal';
import { useMyInfo } from '../../hook/user/userHook';
import { logout } from '../../service/user/userApi';

import mouse from '../../assets/profile/mouse.png';
import mousesad from '../../assets/profile/mouse_sad.png';
import mousemad from '../../assets/profile/mouse_mad.png';
import tiger from '../../assets/profile/tiger.png';
import tigersad from '../../assets/profile/tiger_sad.png';
import tigermad from '../../assets/profile/tiger_mad.png';
import snake from '../../assets/profile/snake.png';
import snakesad from '../../assets/profile/snake_sad.png';
import snakemad from '../../assets/profile/snake_mad.png';
import dog from '../../assets/profile/dog.png';
import dogsad from '../../assets/profile/dog_sad.png';
import dogmad from '../../assets/profile/dog_mad.png';
import rabbit from '../../assets/profile/rabbit.png';
import rabbitsad from '../../assets/profile/rabbit_sad.png';
import rabbitmad from '../../assets/profile/rabbit_mad.png';
import cow from '../../assets/profile/cow.png';
import cowsad from '../../assets/profile/cow_sad.png';
import cowmad from '../../assets/profile/cow_mad.png';

function SettingPage() {
    const [animal, setAnimal] = useState(null);
    const [nickname, setNickname] = useState('닉네임');
    const [curpoint, setCurpoint ] = useState(0);
    const [status, setStatus] = useState('상태 메세지가 없습니다.');
    const [showModal, setShowModal] = useState(false);
    const [showNicknameModal, setShowNicknameModal] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showUserDeleteModal, setShowUserDeleteModal] = useState(false);
    const { data: myInfo, isLoading: myInfoLoading, error: myInfoError } = useMyInfo();
    const [isLoginByKakaoandGoogle, setIsLoginByKakaoandGoogle ] = useState(false);

    const animals = {
        cow: { happy: cow, sad: cowsad, mad: cowmad },
        rabbit: { happy: rabbit, sad: rabbitsad, mad: rabbitmad },
        dog: { happy: dog, sad: dogsad, mad: dogmad },
        snake: { happy: snake, sad: snakesad, mad: snakemad },
        tiger: { happy: tiger, sad: tigersad, mad: tigermad },
        mouse: { happy: mouse, sad: mousesad, mad: mousemad }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (myInfo && myInfo.data) {
            console.log(myInfo.data)

            setNickname(myInfo.data.nickname)
            setCurpoint(myInfo.data.point)
            setStatus(myInfo.data.statusMessage)
            setAnimal(animals[myInfo.data.profile.toLowerCase()][myInfo.data.emotion.toLowerCase()])

            if (myInfo.data.role === 'KAKAO' || 'GOOGLE') {
                setIsLoginByKakaoandGoogle(true);
            }
        }
    }, [myInfo]);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.setting}>
            {showModal && <SettingModal setShowModal={setShowModal} setAnimal={setAnimal} />}
            {showNicknameModal && <SettingNicknameModal nickname={nickname} setShowNicknameModal={setShowNicknameModal} setNickname={setNickname}/>}
            {showMessageModal && <SettingMessageModal setShowMessageModal={setShowMessageModal} setStatus={setStatus} status={status}/>}
            {showUserDeleteModal && <SettingUserDeleteModal setShowUserDeleteModal={setShowUserDeleteModal} />}
            <div className={styles.header}>
                <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate(-1)}}/>
                <div className={styles.title}>
                    <span>설정</span>
                </div>
            </div>
            <div className={styles.userinfo}>
                <div className= {styles.profile}>
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
                        <span className={styles.point}>보유포인트 : {curpoint}pt<AddCircleOutlineIcon color="action" className={styles.addpoint} onClick={() => {navigate('/payment')}}/></span>
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
                <div className={styles.settingItem} onClick={handleLogout}>
                    <span className={styles.settingText}><LogoutIcon/>&nbsp;&nbsp;&nbsp;&nbsp;로그아웃</span>
                    <span className={styles.settingArrow}>›</span>
                </div>
                {!isLoginByKakaoandGoogle && (
                    <div className={styles.settingItem} onClick={()=>{navigate('/PwReset')}}>
                        <span className={styles.settingText} ><LockResetIcon/>&nbsp;&nbsp;&nbsp;&nbsp;비밀번호 수정</span>
                        <span className={styles.settingArrow}>›</span>
                    </div>
                )}
                <div className={styles.settingItem} onClick={()=>{setShowUserDeleteModal(true)}}>
                    <span className={`${styles.settingText} ${styles.dangerText}`}><PhonelinkEraseIcon sx={{ color: pink[500] }}/>&nbsp;&nbsp;&nbsp;&nbsp;회원 탈퇴</span>
                    <span className={styles.settingArrow}>›</span>
                </div>
            </div>
        </div>
    )
}

export default SettingPage;