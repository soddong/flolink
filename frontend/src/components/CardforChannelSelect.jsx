import styles from '../css/channelselect.module.css'

function CardforChannelSelect(props) {
    return (
        // <div className={styles.cardforselect}>
        //     <h3>{props.a.title}</h3>
        //     <h4>{props.a.familySize}</h4>
        // </div>
        <div className={styles.card}>
            <div className={styles.img}>
                
            </div>
                <div className={styles.text}>
                    
                    <div className={styles.h3}>{props.a.title}</div>
                    <div className={styles.p}>명{props.a.familySize}</div>
                    
                </div>
        </div>
    )
}

export default CardforChannelSelect