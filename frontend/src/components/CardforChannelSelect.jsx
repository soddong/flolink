import styles from '../css/channelselect.module.css'

function CardforChannelSelect(props) {
    return (
        <div className={styles.cardforselect}>
            <h3>{props.a.title}</h3>
            <h4>{props.a.familySize}</h4>
        </div>
    )
}

export default CardforChannelSelect