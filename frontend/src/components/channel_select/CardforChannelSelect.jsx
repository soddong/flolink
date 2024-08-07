import styles from "../../css/channel_select/channelselect.module.css";
import { useNavigate } from "react-router-dom";
import userRoomStore from "../../store/userRoomStore";
function CardforChannelSelect({ family }) {
  const navigate = useNavigate();
  const setRoomId = userRoomStore((state) => state.setRoomId);
  const handleRoomEnter = (roomId) => {
    setRoomId(roomId);
    navigate("/main");
  };

  return (
    <div className={styles.card} onClick={() => handleRoomEnter(family.roomId)}>
      <div className={styles.img}></div>
      <div className={styles.text}>
        <div className={styles.h3}>{family.title}</div>
        <div className={styles.p}>{family.familySize}명</div>
      </div>
    </div>
  );
}

export default CardforChannelSelect;
