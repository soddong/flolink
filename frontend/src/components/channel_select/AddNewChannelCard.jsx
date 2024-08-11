import styles from '../../css/channel_select/channelselect.module.css'

function AddNewChannelCard({ onClick }) {
    
    return (
        <div className={`${styles.card} ${styles.addCard}`} onClick={onClick}>
            <div className={styles.addIconContainer}>
                <div className={styles.addIcon}>+</div>
            </div>
        </div>
    )
}

export default AddNewChannelCard;