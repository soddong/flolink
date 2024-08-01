import styles from '../../css/setting/settingpage.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ProfileDummy from '../../assets/profile/profile_dummy.jpg';

function SettingPage() {
    
    
    return (
        <div className={styles.setting}>
            <div className={styles.header}>
                <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }}/>
                <div className={styles.title}>
                    <span>설정</span>
                프로필사진 닉네임 상메 포인트 로그아웃
                    
                </div>
            </div>
            <div className={styles.userinfo}>
                <div className= {styles.profile}>
                    <button className={styles.logout}>로그아웃</button>
                    <img src={ProfileDummy} />
                    <div className={styles.username}>
                        <span className={styles.name}>OOO님</span>
                        <span className={styles.point}>보유포인트 : 1993pt</span>
                    </div>
                </div>
                <div className={styles.message}>
                    <div className={styles.realmessage}>
                        상메칸
                    </div>
                </div>
            </div>
            <div className={styles.settingcontent}>
                비밀번호 수정
                회원 탈퇴
            </div>
        </div>
    )
}

export default SettingPage;