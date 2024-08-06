import styles from '../../css/my_room/myRoom.module.css';
import Inventory from '@mui/icons-material/Inventory2';
import ItemStore from '@mui/icons-material/StorefrontOutlined';
import NavBar from '../../components/common/nav_bar/NavBar';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import room from '../../assets/myroom/bg_myroom.png';
import { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useItemStore from '../../store/itemStore';
import { useInventory, useMyroom } from '../../hook/user/userHook.js';


function MyRoomPage() {
    const { items, images, selectedItems, userInventory, setSelectedItems, setUserInventory } = useItemStore();
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [isClosing, setIsClosing] = useState(false);
    const { data: inventory, isLoading: inventoryLoading, error: inventoryError } = useInventory();
    const { data: myroom, isLoading: myroomLoading, error: myroomError } = useMyroom();

    useEffect(() => {
        if (isInventoryOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isInventoryOpen]);

    // useEffect(() => {
    //     if (inventory && inventory.data) {
    //         setUserInventory(inventory.data);
    //     }
    // }, [inventory])

    const inventoryRef = useRef(null);

    const openInventory = () => setIsInventoryOpen(true);
    
    const closeInventory = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsInventoryOpen(false);
            setIsClosing(false);
        }, 300);
    };

    const handleClickOutside = (event) => {
        if (inventoryRef.current && !inventoryRef.current.contains(event.target)) {
            closeInventory();
        }
    };

    const handleItemSelect = (itemType, variantIndex) => {
        setSelectedItems(itemType, variantIndex);
        setSelectedItemType(null);
    };

    const renderItemSelection = () => {
        if (!selectedItemType) {
            return (
                <div className={styles.itemTypeButtons}>
                    {items.map(item => (
                        <button 
                            key={item.name} 
                            onClick={() => setSelectedItemType(item.name)}
                            className={styles.itemTypeButton}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            );
        }

        const variants = userInventory[selectedItemType] || [];

        return (
            <div className={styles.itemVariantButtons}>
                <button onClick={() => setSelectedItemType(null)} className={styles.itemVariantButton}>뒤로가기</button>
                <button onClick={() => handleItemSelect(selectedItemType, null)} className={styles.itemVariantButton}>없음</button>
                {variants.map(variantIndex => (
                    
                        
                        <button 
                            key={variantIndex} 
                            onClick={() => handleItemSelect(selectedItemType, variantIndex)}
                            className={styles.itemVariantButton}
                        >
                            <img 
                                src={images[selectedItemType][variantIndex - 1]} 
                                alt={`${selectedItemType} ${variantIndex}`}
                                className={styles.itemImage}
                            />
                            {selectedItemType} {variantIndex}
                        </button>
                   
                ))}
            </div>
        );
    };

    const navigate = useNavigate();


    const gotoItemStore = () => {
        navigate('/itemstore');
    }

    return (
        <div className={styles.myRoom}>
            <div className={styles.myRoomHeader}>
                <div>
                    <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }} onClick={()=>{navigate(-1)}}/>
                </div>
                <div>
                    <span>OOO님의 마이룸</span>
                </div>
                <div className={styles.myRoomIcons}>
                    <div className={styles.myRoomInventory} onClick={openInventory}>
                        <Inventory color="primary"/>
                        <span>인벤토리</span>
                    </div>
                    <div className={styles.myRoomItemStore} onClick={gotoItemStore}>
                        <ItemStore color="primary"/>
                        <span>상점</span>
                    </div>
                </div>
            </div>
            <div className={styles.myRoomItems}>
                <img src={room} className={styles.roomImg} alt="Room"/>
                {items.map(item => (
                    selectedItems[item.name] && (
                        <img 
                            key={item.name}
                            src={item.variants[selectedItems[item.name] - 1]} 
                            className={`${styles[item.name]} ${styles.item}`}
                            alt={item.name}
                        />
                    )
                ))}
            </div>
            <NavBar/>
            {isInventoryOpen && (
                <div 
                    className={`${styles.inventoryToast} ${styles.inventoryToastOpen} ${isClosing ? styles.inventoryToastClosing : ''}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div 
                        ref={inventoryRef}
                        className={`${styles.inventoryContent} ${isClosing ? styles.inventoryContentClosing : ''}`}
                    >
                        {renderItemSelection()}
                    </div>
                </div>
            )}
        </div>
    )    
}

export default MyRoomPage;