import styles from '../../css/my_room/myRoom.module.css';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import room from '../../assets/myroom/bg_myroom.png';
import useItemStore from '../../store/itemStore';
import { useNavigate } from 'react-router-dom';
import { useYourMyroom } from '../../hook/myroom/myroomHook';
import { useEffect } from 'react';
import { useItems } from '../../hook/itemstore/itemstoreHook';

function YourRoomPage({userRoomId}) {
    const navigate = useNavigate();
    const { items, images, selectedItems, setUserInventory, setItems, generateImagesFromNames } = useItemStore();
    const { mutate: fetchMyroom, isLoading, isError, data } = useYourMyroom();
    const { data: itemsData, isLoading: itemsDataLoading, error: itemsDataError } = useItems();
  
    useEffect(() => {
      if (userRoomId) {
        fetchMyroom(userRoomId);
      }
    }, [userRoomId, fetchMyroom]);

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
      if (data) {
        console.log(data.data.hasItemInfos)
        setUserInventory(data.data.hasItemInfos)
      }
    }, [data, setUserInventory]);
  
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
                </div>
            </div>
            <div className={styles.myRoomItems}>
                <img src={room} className={styles.roomImg} alt="Room"/>
                {items.map(item => {
                    const selectedVariant = selectedItems[item.name];
                    if (selectedVariant !== undefined && selectedVariant !== null) {
                        return (
                            <img 
                                key={item.name}
                                src={images[item.name][selectedVariant - 1]}
                                alt={`${item.name} ${selectedVariant}`}
                                className={styles[item.name]}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    )    
}

export default YourRoomPage;