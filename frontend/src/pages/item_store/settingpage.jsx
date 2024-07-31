import styles from '../../css/item_store/settingPage.module.css'
import { useState } from 'react';
import rug1 from '../../assets/myroom/items/rug1.png';
import rug2 from '../../assets/myroom/items/rug2.png';
import shelf1 from '../../assets/myroom/items/shelf1.png';
import shelf2 from '../../assets/myroom/items/shelf2.png';
import stand1 from '../../assets/myroom/items/stand1.png';
import stand2 from '../../assets/myroom/items/stand2.png';
import bed1 from '../../assets/myroom/items/bed1.png';
import bed2 from '../../assets/myroom/items/bed2.png';
import minitable1 from '../../assets/myroom/items/minitable1.png';
import minitable2 from '../../assets/myroom/items/minitable2.png';
import vase1 from '../../assets/myroom/items/vase1.png';
import vase2 from '../../assets/myroom/items/vase2.png';
import bigtable1 from '../../assets/myroom/items/bigtable1.png';
import bigtable2 from '../../assets/myroom/items/bigtable2.png';

function SettingPage(props) {
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
                            <li>
                                <img></img>
                            </li>
                            <li>아이템 2</li>
                            <li>아이템 3</li>
                            <li>아이템 1</li>
                            <li>아이템 2</li>
                            <li>아이템 3</li>    
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