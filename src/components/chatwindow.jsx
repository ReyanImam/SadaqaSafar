import React, { useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatWindow = ({ conversation, messages, newMessage, setNewMessage, onSendMessage }) => {
  const messagesEndRef = useRef(null);


  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-indigo-50">
        <h2 className="font-semibold text-indigo-800">Chat with {conversation.otherParticipant.name}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-white">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 flex ${msg.sender.type === 'NGO' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.sender.type === 'NGO'
                  ? 'bg-indigo-100 text-indigo-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={onSendMessage}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;