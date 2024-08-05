import React, { useState } from 'react';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Here you would typically send the message to an AI service
      // For now, we'll just echo the message
      setConversation([...conversation, { type: 'user', text: message }]);
      setConversation(conv => [...conv, { type: 'ai', text: `Echo: ${message}` }]);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {conversation.map((msg, index) => (
          <div key={index} style={{ color: msg.type === 'user' ? 'blue' : 'green' }}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask AI assistant..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default AIAssistant;