import DoubleCheckIcon from "../icons/DoubleCheckIcon";
import PlusIcon from "../icons/PlusIcon";
import styles from "./ChatList.module.css";

export default function ChatList() {
  return (
    <aside className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чаты</h1>
        <button className={styles.add_button} type="button">
          <PlusIcon />
        </button>
      </header>

      <input className={styles.input} type="text" placeholder="Найти" />
      <div className={styles.list}>
        <div className={`${styles.item} ${styles.item_active}`}>
          <div className={styles.avatar}></div>
          <div className={styles.content}>
            <div className={styles.item_title}>
              <h3 className={styles.item_heading}>Чат 1</h3>
              <div className={styles.time}>
                <DoubleCheckIcon size={16} />
                18:42
              </div>
            </div>
            <p className={styles.item_description}>Последнее сообщение</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.avatar}></div>
          <div className={styles.content}>
            <div className={styles.item_title}>
              <h3 className={styles.item_heading}>Чат 2</h3>
              <div className={styles.time}>
                <DoubleCheckIcon size={16} />
                16:27
              </div>
            </div>
            <p className={styles.item_description}>Последнее сообщение 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
