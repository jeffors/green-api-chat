import "./App.css";
import ChatContent from "./components/ChatContent/ChatContent";
import LoginForm from "./components/LoginForm/LoginForm";
import { useState } from "react";
import type { Instance } from "./api/client";

function App() {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  if (!instance) return <LoginForm setInstance={setInstance} />;

  return (
    <div className="app">
      <ChatContent instance={instance} />
    </div>
  );
}

export default App;
