import { useState } from "react";
import styles from "./LoginForm.module.css";
import { checkStateInstance } from "../../api/greenApi";
import { useAuth } from "../../auth/useAuth";

export default function LoginForm() {
  const [idInstance, setIdInstance] = useState<string>("");
  const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsLoading(true);
    setError(null);
    try {
      await checkStateInstance({ idInstance, apiTokenInstance });
      login({ idInstance, apiTokenInstance });
    } catch {
      setError("Не удалось войти. Проверьте данные инстанса.");
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
            onChange={(e) => setIdInstance(e.target.value)}
            inputMode="numeric"
            placeholder="idInstance"
          />
          <input
            className={styles.input}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            type="password"
            placeholder="apiTokenInstance"
          />
          {/* <input
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="text"
            placeholder="Номер телефона"
            value={phoneNumber}
          /> */}
          {error && <p className={styles.error}>{error}</p>}
          <button
            disabled={isLoading || !idInstance || !apiTokenInstance}
            className={styles.button}
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>
      </div>
    </div>
  );
}
