import styles from '../../css/item_store/ItemStorePage.module.css'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import soldoutImage from '../../assets/itemstore/soldout.png';
import useItemStore from '../../store/itemStore';
import { useItems, usePaymentHistory, usePurchaseHistory } from '../../hook/itemstore/itemstoreHook.js'
import ItemStoreModal from './itemStoreModal.jsx';

function ItemStorePage(props) {
    const [activeTab, setActiveTab] = useState('itemlist');
    const [expandedItem, setExpandedItem] = useState(null);
    const { userInventory, items, images, setItems, setImages, generateImagesFromNames, setPurchaseHistory, setPaymentHistory, histories, coins } = useItemStore();
    const { data: itemsData, isLoading: itemsLoading, error: itemsError } = useItems();
    const { data: paymentHistoryData, isLoading: paymentHistoryLoading, error: paymentHistoryError } = usePaymentHistory();
    const { data: purchaseHistoryData, isLoading: purchaseHistoryLoading, error: purchaseHistoryError } = usePurchaseHistory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false)

    const isItemPurchased = (itemName, variantIndex) => {
        return userInventory[itemName] && userInventory[itemName].includes(variantIndex + 1);
    };

    const openModal = (variant) => {
        if (!isModalOpen) {
            setSelectedItem(variant)
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            setPurchaseStatus(null);
            setSelectedItem(null);
        }, 300);
    };

    const handlePurchase = async () => {
        // 여기에 나중에 결제 처리 할것
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.random() > 0.5);
            }, 1000);
        });
    };

    const processPurchase = async () => {
        const result = await handlePurchase();
        setPurchaseStatus(result ? '결제가 완료되었습니다.' : '결제가 취소되었습니다.');
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (itemsData && itemsData.data) {
            const processedItems = [];
            const itemNames = [];

            itemsData.data.forEach(item => {
                const baseName = item.itemName.replace(/[0-9]/g, '');

                if (!processedItems.some(el => el.name === baseName)) {
                    processedItems.push({ name: baseName, variants: [] });
                }

                const itemIndex = processedItems.findIndex(el => el.name === baseName);
                processedItems[itemIndex].variants.push(item.itemName);

                if (!itemNames.includes(item.itemName)) {
                    itemNames.push(item.itemName);
                }
            });

            setItems(processedItems);
            setImages(generateImagesFromNames(itemNames));
        }
    }, [itemsData]);

    useEffect(() => {
        if (paymentHistoryData && paymentHistoryData.data) {

            setPaymentHistory(paymentHistoryData.data)
        }
    }, [paymentHistoryData])

    useEffect(() => {
        if (purchaseHistoryData && purchaseHistoryData.data) {
            setPurchaseHistory(purchaseHistoryData.data)
        }
    }, [purchaseHistoryData])

    const navigate = useNavigate();

    const toggleItem = (itemName) => {
        console.log(histories)
        setExpandedItem(expandedItem === itemName ? null : itemName);
    };

    return (
        <div className={styles.settingpage}>
            <ItemStoreModal 
                isOpen={isModalOpen}
                isClosing={isClosing}
                onClose={closeModal}
                processPurchase={processPurchase}
                purchaseStatus={purchaseStatus}
                selectedItem={selectedItem}
            />
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
                                        <div 
                                            key={variantIndex} 
                                            
                                            className={`${styles.variantItem} ${isItemPurchased(item.name, variantIndex) ? styles.soldout : ''}`}
                                            
                                            onClick={(e) => {
                                                if (!isItemPurchased(item.name, variantIndex)) {
                                                    e.stopPropagation();
                                                    openModal(variant);
                                                }
                                            }}
                                          >
                                            <img 
                                                src={images[item.name][variantIndex]} 
                                                alt={`${item.name} variant ${variantIndex + 1}`} 
                                                className={styles.variantImage}
                                            />
                                            <span className={styles.variantNumber}>{item.name} {variantIndex + 1}</span>
                                            {isItemPurchased(item.name, variantIndex) && (
                                                <img 
                                                    src={soldoutImage} 
                                                    alt="Sold Out" 
                                                    className={styles.soldoutImage}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}                         
                    </ul>
                )}
                    
                    {activeTab === 'purchaseHistories' && (
                        <ul className={styles.list}>
                            {
                                histories.map((history, index) => {
                                    
                                    let baseName;
                                    let variantIndex;
                                    let basePoint;
                                    let imgSource;

                                    if (history.isPurchase) {
                                        baseName = history.itemName.replace(/[0-9]/g, '');
                                        variantIndex = parseInt(history.itemName.replace(/\D/g, '')) - 1; 
                                    }
                                    else {
                                        basePoint = history.orderName.replace(' 포인트', '')
                                        if (basePoint == '1000') {
                                            imgSource = 0
                                        }
                                        else if (basePoint == '3000') {
                                            imgSource = 1
                                        }
                                        else if (basePoint == '5000') {
                                            imgSource = 2
                                        }
                                        else {
                                            imgSource = 3
                                        }
                                    }
                                    
                                    return (
                                        <li key={index} className={styles.historyListItem}>
                                            { history.isPurchase ? 
                                                (
                                                    <div className={styles.purchasedItem}>
                                                        <img src={images[baseName][variantIndex]}/>
                                                        <div className={styles.purchaseInfo}>
                                                            <div className={styles.purchaseinfoforname}>
                                                                <span>{ history.itemName }</span>
                                                                <span>{ history.itemAmount }</span>
                                                            </div>
                                                            <div className={ styles.purchaseDate }>
                                                                <span>{ history.transactionAt }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            : (
                                                <div className={styles.purchasedItem}>
                                                    <img src={coins[imgSource]}/>
                                                    
                                                    <div className={styles.purchaseInfo}>
                                                        <div className={styles.purchaseinfoforname}>
                                                            <span>{ basePoint }pt</span>
                                                            <span>{ history.amount }</span>
                                                        </div>
                                                        <div className={ styles.purchaseDate }>
                                                            <span>{ history.paymentAt }</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </li>
                                )})
                            }
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemStorePage;