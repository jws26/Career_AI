import React, { useState } from 'react';
import './Chat.css';
import { getClaudeResponse } from '../services/claude';

interface Message {
  text: string;
  sender: 'user' | 'claude';
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (message.trim() !== '' && !isLoading) {
      const userMessage: Message = { text: message, sender: 'user' };
      setChatHistory(prev => [...prev, userMessage]);
      setMessage('');
      setIsLoading(true);

      try {
        const claudeResponse = await getClaudeResponse(message);
        const claudeMessage: Message = { text: claudeResponse, sender: 'claude' };
        setChatHistory(prev => [...prev, claudeMessage]);
      } catch (error) {
        const errorMessage: Message = { text: 'Sorry, something went wrong.', sender: 'claude' };
        setChatHistory(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            <b>{msg.sender === 'user' ? 'You' : 'Claude'}:</b> {msg.text}
          </div>
        ))}
        {isLoading && <div className="chat-message loading">Claude is thinking...</div>}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button className="chat-send-button" onClick={handleSendMessage} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chat;
