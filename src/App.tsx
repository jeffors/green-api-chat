import "./App.css";
import ChatContent from "./components/ChatContent/ChatContent";
import ChatList from "./components/ChatList/ChatList";
import LoginForm from "./components/LoginForm/LoginForm";
import { useAuth } from "./auth/useAuth";

function App() {
  const { instance } = useAuth();

  if (!instance) return <LoginForm />;

  return (
    <div className="app">
      <ChatList />
      <ChatContent />
    </div>
  );
}

export default App;
