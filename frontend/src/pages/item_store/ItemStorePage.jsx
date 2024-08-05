import styles from '../../css/item_store/ItemStorePage.module.css'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useItemStore from '../../store/itemStore';
import {useItems} from '../../hook/itemstore/itemstoreHook.js'

function ItemStorePage(props) {
    const [activeTab, setActiveTab] = useState('itemlist');
    const [expandedItem, setExpandedItem] = useState(null);
    const { items, images } = useItemStore();

    const { data, isLoading, error } = useItems();
    
    const navigate = useNavigate();

    const toggleItem = (itemName) => {
        console.log(data)
        setExpandedItem(expandedItem === itemName ? null : itemName);
    };

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;

    return (
        <div className={styles.settingpage}>
            <div className={styles.header}>
                <div>
                    <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate(-1)}}/>
                </div>
                <div className={styles.title}>
                    <span>상점</span>
                </div>
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
                        className={`${styles.tab} ${activeTab === 'itemlist' ? styles.active : ''}`}
                        onClick={() => setActiveTab('itemlist')}
                    >
                        아이템
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'purchaseHistories' ? styles.active : ''}`}
                        onClick={() => setActiveTab('purchaseHistories')}
                    >
                        구매내역
                    </button>
                </div>
                <div className={styles.tabContent}>
                    {activeTab === 'itemlist' && (
                        <ul className={styles.list}>
                            {items.map((item, index) => (
                                <li key={index} className={styles.itemListItem}>
                                    <div 
                                        className={styles.itemInfo}
                                        onClick={() => toggleItem(item.name)}
                                    >
                                        <img 
                                            src={images[item.name][0]} 
                                            alt={item.name} 
                                            className={styles.itemImage}
                                        />
                                        <span className={styles.itemName}>{item.name}</span>
                                    </div>
                                    <div className={`${styles.itemVariants} ${expandedItem === item.name ? styles.expanded : ''}`}>
                                        {item.variants.map((variant, variantIndex) => (
                                            <div key={variantIndex} className={styles.variantItem}>
                                                <img 
                                                    src={variant} 
                                                    alt={`${item.name} variant ${variantIndex + 1}`} 
                                                    className={styles.variantImage}
                                                />
                                                <span className={styles.variantNumber}>{item.name} {variantIndex + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}                         
                        </ul>
                    )}
                    
                    {activeTab === 'purchaseHistories' && (
                        <ul className={styles.list}>
    
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemStorePage;