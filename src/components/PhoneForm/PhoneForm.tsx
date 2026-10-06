import { useState } from "react";
import styles from "./LoginForm.module.css";
import { checkAccount } from "../../api/greenApi";
import type { Instance } from "../../api/client";

export default function PhoneForm({ instance }: { instance: Instance }) {
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
        checkAccount(instance, phoneNumber);
      }
    } catch {
      setError("Не этом номере телфона не найден аккаунт Max.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <h2 className={styles.heading}>Напишите данные вашего инстанса</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Номер телефона"
            value={phoneNumber}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button
            disabled={isLoading || !phoneNumber}
            className={styles.button}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
