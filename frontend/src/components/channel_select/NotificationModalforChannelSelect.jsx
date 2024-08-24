import styles from "../../css/channel_select/modalforchannelselect.module.css";
import { useEffect, useRef } from "react";

function NotificationModalforChannelSelect({
  isOpen,
  onClose,
  handleNotification,
}) {

const modalRef = useRef(null)

useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains(styles.modalOverlay)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
}, [isOpen, onClose]);

if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <h2 className={styles.modalTitle}>알림을 받으시겠어요?</h2>
        <button className={styles.modalButton} onClick={handleNotification}>수락</button>
        <button className={styles.closeButton} onClick={onClose}>거절</button>
      </div>
    </div>
  );
}

export default NotificationModalforChannelSelect;
