import styles from "./ChatContent.module.css";
export default function ChatContent() {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <button className={styles.back_button}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <div className={styles.header_chat}>
          <div className={styles.avatar}></div>
          <div className={styles.content}>
            <h3 className={styles.header_chat_title}>Чат 1</h3>
            <p className={styles.header_chat_description}>2 ч назад</p>
          </div>
        </div>
      </div>
      <div className={styles.messages}>
        <div className={styles.list}>
          <div className={styles.bubble}>
            На краю дороги стоял дуб. Вероятно, в десять раз старше берёз,
            составлявших лес, он был в десять раз толще и в два раза выше каждой
            берёзы. Это был огромный, в два обхвата, дуб, с обломанными, давно
            видно, суками и с обломанной корой, заросшей старыми болячками. С
            огромными своими неуклюжими, несимметрично растопыренными, корявыми
            руками и пальцами, он старым, сердитым и презрительным уродом стоял
            между улыбающимися берёзами. Только он один не хотел подчиняться
            обаянию весны и не хотел видеть ни весны, ни солнца. „Весна, и
            любовь, и счастие! — как будто говорил этот дуб, — и как не надоест
            вам всё один и тот же глупый и бессмысленный обман! Всё одно и то
            же, и всё обман! Нет ни весны, ни солнца, ни счастья. Вон смотрите,
            сидят задавленные мёртвые ели, всегда одинакие, и вон и я растопырил
            свои обломанные, ободранные пальцы, где ни выросли они — из спины,
            из боков; как выросли — так и стою, и не верю вашим надеждам и
            обманам
            <div className={styles.time}>18:41</div>
          </div>
          <div className={`${styles.bubble} ${styles.bubble_own}`}>
            ОКАК
            <div className={styles.time}>
              18:42
              <svg
                width={14}
                height={14 * 0.75}
                viewBox="0 0 24 18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 9.5l5 5L16 3" />
                <path d="M10 13.5l1 1L22 3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <input className={styles.input} type="text" placeholder="Сообщение" />
        <button className={styles.send_button}>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
