import { useEffect, useState } from "react";
import {
  deleteNotification,
  recieveNotification,
  sendMessage,
} from "../../api/greenApi";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import BackArrow from "../icons/BackArrow";
import DoubleCheckIcon from "../icons/DoubleCheckIcon";
import styles from "./ChatContent.module.css";
import type { Instance } from "../../api/client";

interface Message {
  id: string | number;
  message: string;
  isOwn: boolean;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    message: "На краю дороги стоял дуб...",
    isOwn: false,
  },
  {
    id: 2,
    message: "ОКАК",
    isOwn: true,
  },
];

export default function ChatContent({ instance }: { instance: Instance }) {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [text, setText] = useState<string>("");

  const handleSend = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!instance || !text.trim()) return;

    const currentText = text;
    setText("");

    try {
      const response = await sendMessage(instance, "phone", currentText);
      setMessages((prev) => [
        ...prev,
        {
          id: response.idMessage,
          message: currentText,
          isOwn: true,
        },
      ]);
    } catch (e) {
      console.error("Ошибка отправки:", e);
    }
  };

  useEffect(() => {
    if (!instance) return;

    let isMounted = true;
    let timerId: ReturnType<typeof setTimeout>;

    const pollNotifications = async () => {
      try {
        const notification = await recieveNotification(instance);

        if (notification && isMounted) {
          const { receiptId, body } = notification;

          if (
            (body.typeWebhook === "incomingMessageReceived" ||
              body.typeWebhook === "outgoingMessageReceived") &&
            body.messageData?.typeMessage === "textMessage"
          ) {
            const isOwn = body.typeWebhook === "outgoingMessageReceived";
            const newMsgId = body.idMessage;
            const newMsgText = body.messageData.textMessageData.textMessage;

            setMessages((prev) => {
              if (prev.some((m) => String(m.id) === String(newMsgId))) {
                return prev;
              }
              return [
                ...prev,
                {
                  id: newMsgId,
                  message: newMsgText,
                  isOwn,
                },
              ];
            });
          }

          await deleteNotification(instance, receiptId);
        }
      } catch (e) {
        console.error("Ошибка при получении уведомления:", e);
      } finally {
        if (isMounted) {
          timerId = setTimeout(pollNotifications, 1000);
        }
      }
    };

    pollNotifications();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [instance]);

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
          {messages.map((msg) => (
            <div
              className={`${styles.bubble} ${msg.isOwn ? styles.bubble_own : ""}`}
              key={msg.id}
            >
              {msg.message}
              <div className={styles.time}>
                18:42
                {msg.isOwn && <DoubleCheckIcon size={14} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form className={styles.footer} onSubmit={handleSend}>
        <input
          className={styles.input}
          type="text"
          placeholder="Сообщение"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button disabled={!text.trim()} className={styles.send_button}>
          <ArrowUpIcon size={24} />
        </button>
      </form>
    </div>
  );
}
