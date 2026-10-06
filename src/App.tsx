import "./App.css";
import ChatContent from "./components/ChatContent/ChatContent";
import LoginForm from "./components/LoginForm/LoginForm";
import { useState } from "react";
import type { Instance } from "./api/client";
import PhoneForm from "./components/PhoneForm/PhoneForm";

function App() {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  if (!instance) return <LoginForm setInstance={setInstance} />;

  if (!chatId)
    return (
      <PhoneForm
        instance={instance}
        setInstance={setInstance}
        setChatId={setChatId}
      />
    );

  return (
    <div className="app">
      <ChatContent instance={instance} chatId={chatId} setChatId={setChatId} />
    </div>
  );
}

export default App;
