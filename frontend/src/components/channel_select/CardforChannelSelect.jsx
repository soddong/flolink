import styles from '../../css/channel_select/channelselect.module.css'

function CardforChannelSelect(props) {
    return (
        
        <div className={styles.card}>
            <div className={styles.img}>
                
            </div>
                <div className={styles.text}>
                    <div className={styles.h3}>{props.a.title}</div>
                    <div className={styles.p}>{props.a.familySize}명</div>
                </div>
        </div>
    )
}

export default CardforChannelSelect