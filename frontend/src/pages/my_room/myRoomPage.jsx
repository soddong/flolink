import styles from '../../css/my_room/myRoom.module.css';
import Inventory from '@mui/icons-material/Inventory2';
import ItemStore from '@mui/icons-material/StorefrontOutlined';
import NavBar from '../../components/common/nav_bar/NavBar';

function MyRoomPage() {


    return (
        <div className={styles.myRoom}>

            <div className={styles.myRoomHeader}>
                <div className={styles.myRoomIcon}>
                    <Inventory color="primary"/>
                    <span>인벤토리</span>
                </div>
                <div className={styles.myRoomIcon}>
                    <ItemStore color="primary"/>
                    <span>상점</span>
                </div>
            </div>
            <NavBar/>
        </div>
    )    
}

export default MyRoomPage;