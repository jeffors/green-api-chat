import { useEffect, useState } from "react";
import {
  deleteNotification,
  getContactAccount,
  recieveNotification,
  sendMessage,
} from "../../api/greenApi";
import ArrowUpIcon from "../icons/ArrowUpIcon";
import BackArrow from "../icons/BackArrow";
import styles from "./ChatContent.module.css";
import type { Instance } from "../../api/client";
import { UserIcon } from "../icons/UserIcon";

interface Message {
  id: string | number;
  message: string;
  isOwn: boolean;
}

export default function ChatContent({
  instance,
  chatId,
  setChatId,
}: {
  instance: Instance;
  chatId: string;
  setChatId: (chatId: string) => void;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [contactName, setContactName] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const handleSend = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!instance || !text.trim()) return;

    const currentText = text;
    setText("");

    try {
      const response = await sendMessage(instance, chatId, currentText);
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

    const getContactInfo = async () => {
      try {
        const { avatar, name } = await getContactAccount(instance, chatId);
        setAvatar(avatar);
        setContactName(name);
      } catch (e) {
        console.error("Ошибка при получении контактной информации:", e);
      }
    };

    const pollNotifications = async () => {
      try {
        const notification = await recieveNotification(instance);

        if (notification && isMounted) {
          const { receiptId, body } = notification;
          const notificationChatId = body.senderData?.chatId;

          if (
            notificationChatId === chatId &&
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

    getContactInfo();
    pollNotifications();

    return () => {
      isMounted = false;
      clearTimeout(timerId);
    };
  }, [instance, chatId]);

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={styles.header_chat}>
          <button className={styles.back_button} onClick={() => setChatId("")}>
            <BackArrow size={24} />
          </button>
          <div className={styles.avatar}>
            {avatar ? (
              <img
                src={avatar}
                alt="Аватарка пользователя"
                className={styles.avatar_picture}
              />
            ) : (
              <UserIcon />
            )}
          </div>
          <div className={styles.info}>
            <h3 className={styles.header_chat_title}>
              {contactName ? contactName : "Чат с пользователем"}
            </h3>
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
