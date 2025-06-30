import React, { useEffect, useRef, useState } from 'react';
import { votinginfo } from './votinginfo';

const ChatWindow = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! How can I help you?' },
  ]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userInput = input.trim();

    setMessages((prev) => [...prev, { from: 'user', text: userInput }]);
    setInput('');
    setLoading(true);

    const messagesPayload = [
      {
        role: 'user',
        parts: [{ text: votinginfo + '\n\nNow answer based on the above only.\n' + userInput }],
      },
    ];

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: messagesPayload }),
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      setMessages((prev) => [...prev, { from: 'bot', text: reply || '🤖 No reply from chatbot.' }]);
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: '❌ Error: ' + err.message }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) sendMessage();
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold">
        Voting AI Assistant
      </div>
      <div ref={chatRef} className="flex-grow p-3 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded max-w-[75%] ${
              msg.from === 'bot'
                ? 'bg-gray-200 text-gray-900'
                : 'bg-blue-500 text-white self-end'
            }`}
          >
            {msg.text}
          </div>
        ))}

        {/* Show "AI is typing..." instead of "Thinking..." */}
        {loading && (
          <div className="italic text-gray-500 bg-gray-100 px-2 py-1 rounded w-fit">
            AI is typing...
          </div>
        )}
      </div>
      <div className="p-2 border-t border-gray-300 flex">
        <textarea
          className="w-full border rounded p-2 mr-2 resize-none"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question..."
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
