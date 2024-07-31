import styles from '../../css/my_room/myRoom.module.css';
import Inventory from '@mui/icons-material/Inventory2';
import ItemStore from '@mui/icons-material/StorefrontOutlined';
import NavBar from '../../components/common/nav_bar/NavBar';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import backgroundgrass from '../../assets/main/background_photo.png';
import room from '../../assets/myroom/bg_myroom.png';
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
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

function MyRoomPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState({
        rug: 1,
        shelf: 1,
        stand: 1,
        bed: 1,
        minitable: 1,
        vase: 1,
        bigtable: 1
    });

    const items = [
        { name: 'rug', variants: [rug1, rug2] },
        { name: 'shelf', variants: [shelf1, shelf2] },
        { name: 'stand', variants: [stand1, stand2] },
        { name: 'bed', variants: [bed1, bed2] },
        { name: 'minitable', variants: [minitable1, minitable2] },
        { name: 'vase', variants: [vase1, vase2] },
        { name: 'bigtable', variants: [bigtable1, bigtable2] },
    ];

    const handleItemSelect = (itemName) => {
        setSelectedItems(prev => ({
            ...prev,
            [itemName]: prev[itemName] === 1 ? 2 : 1
        }));
    };

    return (
        <div className={styles.myRoom}>
            <div className={styles.myRoomHeader}>
                <div>
                    <ArrowBackIosNewRoundedIcon color="primary" sx={{ fontSize: '1.5rem' }}/>
                </div>
                <div className={styles.myRoomIcons}>
                    <div className={styles.myRoomInventory} onClick={() => setIsModalOpen(true)}>
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
                <img src={room} className={styles.roomImg}/>
                {items.map(item => (
                    <img 
                        key={item.name}
                        src={item.variants[selectedItems[item.name] - 1]} 
                        className={styles[item.name]}
                    />
                ))}
            </div>
            <img src={ backgroundgrass } className={styles.backgroundgrass}/>
            <NavBar/>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            >
                <Box className={styles.modal}>
                    <h2>인벤토리</h2>
                    {items.map(item => (
                        <div key={item.name} onClick={() => handleItemSelect(item.name)}>
                            <img src={item.variants[selectedItems[item.name] - 1]} alt={item.name} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </Box>
            </Modal>
        </div>
    )    
}

export default MyRoomPage;