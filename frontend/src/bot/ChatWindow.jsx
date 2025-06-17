import React, { useState } from 'react';
import { votinginfo } from './votinginfo';
import { runOpenAIPrompt } from './runOpenAIPrompt';

const ChatWindow = () => {
  console.log("OpenAI Key:", import.meta.env.VITE_OPENAI_API_KEY);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I assist you today?' },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const txt = input.trim();
    setMessages((prev) => [...prev, { from: 'user', text: txt }]);
    setLoading(true);
    setInput('');

    const lc = txt.toLowerCase();
    if (lc.includes('vote') || lc.includes('how to vote') || lc.includes('voting info')) {
      setMessages((prev) => [...prev, { from: 'bot', text: votinginfo }]);
      setLoading(false);
      return;
    }

    const aiRes = await runOpenAIPrompt(txt);
    setMessages((prev) => [...prev, { from: 'bot', text: aiRes }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold">
        AI Assistant
      </div>
      <div className="flex-grow p-3 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${
              msg.from === 'bot'
                ? 'bg-gray-200 text-gray-900'
                : 'bg-blue-500 text-white self-end'
            } max-w-[75%]`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="italic text-gray-500">AI is typing...</div>}
      </div>
      <div className="p-2 border-t border-gray-300 flex">
        <textarea
          className="w-full border rounded p-2 mr-2 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
