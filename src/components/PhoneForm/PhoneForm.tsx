import { useState } from "react";
import styles from "./PhoneForm.module.css";
import { checkAccount } from "../../api/greenApi";
import type { Instance } from "../../api/client";
import BackArrow from "../icons/BackArrow";

export default function PhoneForm({
  instance,
  setInstance,
  setChatId,
}: {
  instance: Instance;
  setInstance: (instance: Instance | null) => void;
  setChatId: (chatId: string) => void;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    setError(null);
    try {
      if (instance) {
        const response = await checkAccount(instance, phoneNumber);
        console.log(response);
        if (response.chatId) setChatId(response.chatId);
        else {
          setError("На этом номере телефона не найден аккаунт Max.");
        }
      }
    } catch {
      setError("Ошибка сети.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <button
          className={styles.back_button}
          onClick={() => setInstance(null)}
        >
          <BackArrow size={24} />
        </button>
        <h2 className={styles.heading}>
          Введите номер РФ (7XXXXXXXXXX) или РБ (375XXXXXXXXX).
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Номер телефона"
            pattern="^(7\d{10}|375\d{9})$"
            title="11 цифр для РФ (7...) или 12 цифр для РБ (375...)"
            value={phoneNumber}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            disabled={isLoading || !phoneNumber}
            className={styles.button}
          >
            {isLoading ? "Проверить..." : "Продолжить"}
          </button>
        </form>
      </div>
    </div>
  );
}
