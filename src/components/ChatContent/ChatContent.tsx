import { useState } from "react";
import { sendMessage } from "../../api/greenApi";
import { useAuth } from "../../auth/useAuth";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import BackArrow from "../icons/BackArrow";
import DoubleCheckIcon from "../icons/DoubleCheckIcon";
import styles from "./ChatContent.module.css";

export default function ChatContent() {
  const { instance } = useAuth();
  const [message, setMessage] = useState<string>("");

  const handleSend = () => {
    if (instance) {
      sendMessage(instance, "phone", message);
      setMessage("");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <button className={styles.back_button}>
          <BackArrow size={24} />
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
              <DoubleCheckIcon size={14} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <input
          className={styles.input}
          type="text"
          placeholder="Сообщение"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button
          disabled={!message}
          className={styles.send_button}
          onClick={handleSend}
        >
          <ArrowUpIcon size={24} />
        </button>
      </div>
    </div>
  );
}
