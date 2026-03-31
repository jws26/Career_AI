import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  if (!userName) {
    return <Login onLogin={setUserName} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat with Claude</h1>
        <span className="user-greeting">안녕하세요, {userName}님</span>
      </header>
      <main>
        <Chat />
      </main>
    </div>
  );
}

export default App;
