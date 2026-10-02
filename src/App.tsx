import "./App.css";
import ChatContent from "./components/ChatContent/ChatContent";
import ChatList from "./components/ChatList/ChatList";

function App() {
  return (
    <div className="app">
      <ChatList />
      <ChatContent />
    </div>
  );
}

export default App;
