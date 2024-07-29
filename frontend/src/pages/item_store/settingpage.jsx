import styles from '../../css/item_store/settingPage.module.css'
import { useState } from 'react';

function SettingPage() {
    const [activeTab, setActiveTab] = useState('items');

    return (
        <div className={styles.settingpage}>
            <div className={styles.header}>
                여기는 헤더 뒤로가기가 있지
            </div>
            <div className={styles.mycardcontainer}>
                <div className={styles.mycard}>
                    <div className={styles.mycardhead}>
                        <span>이름</span>
                    </div>
                    <div className={styles.mycardpoint}>
                        <div className={styles.mycardpointhead}>
                            <span>내 포인트</span>
                        </div>
                        <div className={styles.mypoint}>
                            <span>281 point</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.settinglist}>
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${activeTab === 'items' ? styles.active : ''}`}
                        onClick={() => setActiveTab('items')}
                    >
                        아이템
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'points' ? styles.active : ''}`}
                        onClick={() => setActiveTab('points')}
                    >
                        포인트
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'purchaseHistories' ? styles.active : ''}`}
                        onClick={() => setActiveTab('purchaseHistories')}
                    >
                        구매내역
                    </button>
                </div>
                <div className={styles.tabContent}>
                    {activeTab === 'items' && (
                        <ul className={styles.list}>
                            <li>아이템 1</li>
                            <li>아이템 2</li>
                            <li>아이템 3</li>
                        </ul>
                    )}
                    {activeTab === 'points' && (
                        <ul className={styles.list}>
                            <li>포인트 내역 1</li>
                            <li>포인트 내역 2</li>
                            <li>포인트 내역 3</li>
                        </ul>
                    )}
                    {activeTab === 'purchaseHistories' && (
                        <ul className={styles.list}>
                            <li>구매 내역 1</li>
                            <li>구매 내역 2</li>
                            <li>구매 내역 3</li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SettingPage;