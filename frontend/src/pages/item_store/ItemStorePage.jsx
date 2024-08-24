import styles from '../../css/item_store/ItemStorePage.module.css'
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import soldoutImage from '../../assets/itemstore/soldout.png';
import useItemStore from '../../store/itemStore';
import { useItems, usePaymentHistory, usePurchaseHistory } from '../../hook/itemstore/itemstoreHook.js'
import { useInventory } from '../../hook/user/userHook.js';
import ItemStoreModal from './itemStoreModal.jsx';
import { purchaseItem } from '../../service/itemstore/itemstoreApi.js';
import { useQueryClient } from 'react-query';
import userRoomStore from '../../store/userRoomStore.js';
import { format } from 'date-fns';

function ItemStorePage() {
    const [activeTab, setActiveTab] = useState('itemlist');
    const [expandedItem, setExpandedItem] = useState(null);
    const { userInventory, setUserInventory, items, images, setItems, generateImagesFromNames, setPurchaseHistory, setPaymentHistory, histories, coins } = useItemStore();
    const { data: itemsData, isLoading: itemsLoading, error: itemsError } = useItems();
    const { data: paymentHistoryData, isLoading: paymentHistoryLoading, error: paymentHistoryError } = usePaymentHistory();
    const { data: purchaseHistoryData, isLoading: purchaseHistoryLoading, error: purchaseHistoryError } = usePurchaseHistory();
    const { data: inventory, isLoading: inventoryLoading, error: inventoryError } = useInventory();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [imgSrc, setImgSrc] = useState(null);
    const { myInfo } = userRoomStore();
    const fetchUserInfo = userRoomStore((state) => state.fetchUserInfo);

    const isItemPurchased = (itemName, variantIndex) => {
        return userInventory[itemName] && userInventory[itemName].includes(variantIndex + 1);
    };

    const openModal = (variant, imageSrc) => {
        if (!isModalOpen) {
            setImgSrc(imageSrc)
            setIsModalOpen(true);

            itemsData.data.map((item) => {
                if (variant === item.itemName) {
                    setSelectedItem(item.itemId);
                    return;
                }
            })
        }
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setIsClosing(false);
            setPurchaseStatus(null);
            setSelectedItem(null);
            setImgSrc(null);
        }, 300);
    };

    const queryClient = useQueryClient();

    const processPurchase = async () => {
        try {
            const result =  await purchaseItem(selectedItem);
            setPurchaseStatus('결제가 완료되었습니다.' );
            queryClient.invalidateQueries('purchasehistory')
            queryClient.invalidateQueries('paymenthistory')
            queryClient.invalidateQueries('inventory'); 
            queryClient.invalidateQueries('items'); 
            await fetchUserInfo();  
        } catch(error) {
           
            if (error.response && error.response.data.code === 'ITEM_INSUFFICIENT_FUNDS_ERROR') {
                setPurchaseStatus('포인트가 부족합니다.');
            } else if (error.response && error.response.data.code === 'ITEM_ALREADY_PURCHASE_ERROR') {
              setPurchaseStatus('이미 구매한 상품입니다.')
            }
        }
    };

    useEffect(() => {
        fetchUserInfo();
      }, [fetchUserInfo]);

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
                    processedItems.push({ name: baseName, variants: [], prices: [] });
                }

                const itemIndex = processedItems.findIndex(el => el.name === baseName);
                processedItems[itemIndex].variants.push(item.itemName);
                processedItems[itemIndex].prices.push(item.price);

                if (!itemNames.includes(item.itemName)) {
                    itemNames.push(item.itemName);
                }
            });

            setItems(processedItems);
            generateImagesFromNames(itemNames);

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

    useEffect(() => {
        if (inventory && inventory.data) {
            setUserInventory(inventory.data);
        }
    }, [inventory])

    const navigate = useNavigate();

    const toggleItem = (itemName) => {
        setExpandedItem(expandedItem === itemName ? null : itemName);
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
    
        return format(date, 'yyyy년 MM월 dd일 HH시 mm분');
    }

    return (
        <div className={styles.settingpage}>
            <ItemStoreModal 
                isOpen={isModalOpen}
                isClosing={isClosing}
                onClose={closeModal}
                processPurchase={processPurchase}
                purchaseStatus={purchaseStatus}
                imgSrc = {imgSrc}
            />
            <div className={styles.header}>
                <div>
                    <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate('/main')}}/>
                </div>
                <div className={styles.title}>
                    <span>상점</span>
                </div>
            </div>
            <div className="w-full h-full bg-custom-gradient">
                <div className={styles.mycardcontainer}>
                    <div className={styles.mycard}>
                        <div className={styles.mycardhead}>
                            <span>{myInfo.data.nickname}</span>
                        </div>
                        <div className={styles.mycardpoint}>
                            <div className={styles.mycardpointhead}>
                                <span>내 포인트</span>
                                <span className={`${styles.chargeButton}`} onClick={()=>{navigate('/payment')}}>충전하기</span>
                            </div>
                            <div className={styles.mypoint}>
                                <span>{myInfo.data.point} point</span>
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
                                                        openModal(variant, images[item.name][variantIndex]);
                                                    }
                                                }}
                                            >
                                                <div className={styles.iteminfos}>
                                                    <img 
                                                        src={images[item.name][variantIndex]} 
                                                        alt={`${item.name} variant ${variantIndex + 1}`} 
                                                        className={styles.variantImage}
                                                    />
                                                    <span className={styles.variantNumber}>{item.name} {variantIndex + 1}</span>
                                                </div>
                                                <div>
                                                    <span className={styles.variantNumber}>
                                                        {item.prices[variantIndex]}pt
                                                    </span>
                                                </div>
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
                                            basePoint = history.orderName
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
                                                                    <span>{formatDate( history.transactionAt ) }</span>
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
                                                                <span>{ formatDate(history.paymentAt) }</span>
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
        </div>
    );
}

export default ItemStorePage;