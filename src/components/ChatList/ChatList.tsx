import styles from "./ChatList.module.css";

export default function ChatList() {
  return (
    <aside className={styles.section}>
      <header className={styles.header}>
        <h1 className={styles.title}>Чаты</h1>
        <button className={styles.add_button} type="button">
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
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
                <svg
                  width={16}
                  height={16 * 0.75}
                  viewBox="0 0 24 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={styles.status}
                >
                  <path d="M1 9.5l5 5L16 3" />
                  <path d="M10 13.5l1 1L22 3" />
                </svg>
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
                <svg
                  width={16}
                  height={16 * 0.75}
                  viewBox="0 0 24 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className={styles.status}
                >
                  <path d="M1 9.5l5 5L16 3" />
                  <path d="M10 13.5l1 1L22 3" />
                </svg>
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
