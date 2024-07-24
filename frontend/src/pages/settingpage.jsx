import styles from '../css/settingPage.module.css'

function SettingPage() {
    

    return (
        <div className={styles.settingpage}>
            <div className={styles.header}>
                여기는 헤더 뒤로가기가 있지
            </div>
            <div className={styles.mycardcontainer}>
                <div className={styles.mycard}>
                    <div className={styles.mycardhead}>
                        <span>이름</span>
                        <button>로그아웃</button>
                    </div>
                    <div className={styles.mycardpoint}>
                        <div className={styles.mycardpointhead}>
                            <span>내 포인트</span>
                            <button>충전하기</button>
                        </div>
                        <div className={styles.mypoint}>
                            <span>281 point</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.settinglist}>

            </div>
        </div>
    );
}

export default SettingPage;