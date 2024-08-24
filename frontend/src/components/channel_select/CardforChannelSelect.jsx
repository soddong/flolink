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
      <div className={styles.family}>
        <div className={styles.familyTitle}>{family.title}</div>
        <div className={styles.familyMember}>{family.familySize}인 가족</div>
      </div>
    </div>
  );
}

export default CardforChannelSelect;
