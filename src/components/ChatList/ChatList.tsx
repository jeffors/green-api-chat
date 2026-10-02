import styles from "./ChatList.module.css";

export default function ChatList() {
  return (
    <aside className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чаты</h1>
        <button className={styles.add_button} type="button">
          +
        </button>
      </header>

      <input className={styles.input} type="text" placeholder="Найти" />
      <div className={styles.list}>
        <div className={styles.item}>
          <div className={styles.avatar}></div>
          <div className={styles.content}>
            <h3 className={styles.item_title}>Чат 1</h3>
            <p className={styles.item_description}>Последнее сообщение</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.avatar}></div>
          <div className={styles.content}>
            <h3 className={styles.item_title}>Чат 2</h3>
            <p className={styles.item_description}>Последнее сообщение 2</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
