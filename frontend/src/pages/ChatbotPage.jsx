// AI Chatbot Page
import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiTrash2, FiLoad } from 'react-icons/fi';
import { chatbotService } from '../services/api';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      const response = await chatbotService.getHistory();
      setMessages(response.data.data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || loading) return;

    const userMessage = inputValue;
    setInputValue('');

    // Add user message to UI
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage
    }]);

    setLoading(true);

    try {
      const response = await chatbotService.sendMessage(userMessage);
      const assistantMessage = response.data.data.assistantResponse;

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: assistantMessage
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (window.confirm('Clear all chat history?')) {
      try {
        await chatbotService.clearHistory();
        setMessages([]);
      } catch (error) {
        console.error('Error clearing history:', error);
      }
    }
  };

  const suggestedQuestions = [
    '💪 How can I improve my fitness?',
    '🥗 What should I eat for weight loss?',
    '🧘 How to manage period symptoms?',
    '😴 Tips for better sleep?'
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Health ChatBot 🤖</h1>
          <p className="text-gray-600">Ask me anything about health, fitness, and nutrition!</p>
        </div>
        <button
          onClick={handleClearHistory}
          className="btn-outline flex items-center gap-2"
        >
          <FiTrash2 /> Clear History
        </button>
      </div>

      {/* Chat Container */}
      <div className="card flex-1 overflow-y-auto mb-4">
        {initialLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading chat history...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Start a conversation</h3>
              <p className="text-gray-600 mb-6">Ask me about fitness, nutrition, or health topics</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputValue(question)}
                    className="text-left p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-pink-500 text-white rounded-br-none'
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-lg rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ delay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ delay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !inputValue.trim()}
          className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <FiLoad className="animate-spin" /> : <FiSend />}
        </button>
      </form>
    </div>
  );
}
