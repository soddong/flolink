import styles from '../../css/my_room/myRoom.module.css';
import Inventory from '@mui/icons-material/Inventory2';
import ItemStore from '@mui/icons-material/StorefrontOutlined';
import NavBar from '../../components/common/nav_bar/NavBar';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import backgroundgrass from '../../assets/main/background_photo.png';
import room from '../../assets/myroom/bg_myroom.png';
import { useState, useEffect,useRef } from 'react';
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

function MyRoomPage() {
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const [userInventory, setUserInventory] = useState({});
    const [selectedItemType, setSelectedItemType] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const items = [
        { name: 'rug', variants: [rug1, rug2] },
        { name: 'shelf', variants: [shelf1, shelf2] },
        { name: 'stand', variants: [stand1, stand2] },
        { name: 'bed', variants: [bed1, bed2] },
        { name: 'minitable', variants: [minitable1, minitable2] },
        { name: 'vase', variants: [vase1, vase2] },
        { name: 'bigtable', variants: [bigtable1, bigtable2] },
    ];

    const images = {
        rug: [rug1, rug2],
        shelf: [shelf1, shelf2],
        stand: [stand1, stand2],
        bed: [bed1, bed2],
        minitable: [minitable1, minitable2],
        vase: [vase1, vase2],
        bigtable: [bigtable1, bigtable2],
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 두 개의 API 요청을 병렬로 처리
                const [inventoryResponse, roomResponse] = await Promise.all([
                    fetch('/api/v1/myroom/inventory'),
                    fetch('/api/v1/myroom')
                ]);

                if (!inventoryResponse.ok || !roomResponse.ok) {
                    throw new Error('API 요청에 실패했습니다.');
                }

                const inventoryData = await inventoryResponse.json();
                const roomData = await roomResponse.json();

                // API 응답을 setUserInventory와 setSelectedItems에 설정
                setUserInventory(inventoryData);
                setSelectedItems(roomData);
            } catch (error) {
                console.error('데이터 가져오기 실패:', error);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        
        setSelectedItems({
            rug: 1,
            shelf: 1,
            stand: 1,
            bed: 1,
            minitable: 1,
            vase: 1,
            bigtable: 1
        });

        setUserInventory({
            rug: [1, 2],
            shelf: [1],
            stand: [1, 2],
            bed: [1, 2],
            minitable: null,
            vase: [1, 2],
            bigtable: [1, 2]
        });
    }, []);

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
        setSelectedItems(prev => ({
            ...prev,
            [itemType]: variantIndex
        }));
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

    return (
        <div className={styles.myRoom}>
            <div className={styles.myRoomHeader}>
                <div>
                    <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }}/>
                </div>
                <div>
                    <span>OOO님의 마이룸</span>
                </div>
                <div className={styles.myRoomIcons}>
                    <div className={styles.myRoomInventory} onClick={openInventory}>
                        <Inventory color="primary"/>
                        <span>인벤토리</span>
                    </div>
                    <div className={styles.myRoomItemStore}>
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
                            className={styles[item.name]}
                            alt={item.name}
                        />
                    )
                ))}
            </div>
            <img src={backgroundgrass} className={styles.backgroundgrass} alt="Background grass"/>
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