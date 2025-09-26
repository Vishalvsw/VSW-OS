import React, { useState, useEffect, useRef } from 'react';
import type { Persona } from '../types';
import { generateChatResponse } from '../services/geminiService';
import { ChatbotIcon } from '../components/icons/ChatbotIcon';

const defaultPersonas: Persona[] = [
  { id: 'default-1', name: 'Friendly Support', instruction: 'You are a friendly and helpful customer support agent. You are patient and understanding.', isDefault: true },
  { id: 'default-2', name: 'Expert Consultant', instruction: 'You are an expert consultant. Provide clear, concise, and data-driven advice. Use professional language.', isDefault: true },
  { id: 'default-3', name: 'Creative Brainstormer', instruction: 'You are a creative brainstorming partner. Generate innovative and out-of-the-box ideas. Be enthusiastic and encouraging.', isDefault: true },
];

const ChatbotBuilder: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'model'; parts: { text: string }[] }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedPersonas = localStorage.getItem('customPersonas');
    const customPersonas = savedPersonas ? JSON.parse(savedPersonas) : [];
    const allPersonas = [...defaultPersonas, ...customPersonas];
    setPersonas(allPersonas);
    setSelectedPersona(allPersonas[0]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedPersona || isLoading) return;

    const userMessage = { role: 'user' as const, parts: [{ text: message }] };
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const responseText = await generateChatResponse(selectedPersona.instruction, chatHistory, message);
      const modelMessage = { role: 'model' as const, parts: [{ text: responseText }] };
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = { role: 'model' as const, parts: [{ text: "Sorry, I encountered an error. Please try again." }] };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm">
      {/* Personas Sidebar */}
      <div className="w-1/3 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">AI Personas</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {personas.map(p => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPersona(p);
                setChatHistory([]);
              }}
              className={`p-4 cursor-pointer border-l-4 ${selectedPersona?.id === p.id ? 'border-primary bg-primary-50' : 'border-transparent hover:bg-gray-50'}`}
            >
              <h3 className="font-semibold text-gray-800">{p.name}</h3>
              <p className="text-sm text-gray-500 truncate">{p.instruction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col">
        {selectedPersona ? (
          <>
            <div className="p-4 border-b flex items-center">
              <ChatbotIcon className="h-6 w-6 text-primary mr-3" />
              <h2 className="text-lg font-semibold text-gray-800">{selectedPersona.name}</h2>
            </div>
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 space-y-4">
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-lg px-4 py-2 rounded-xl ${chat.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                    {chat.parts[0].text}
                  </div>
                </div>
              ))}
              {isLoading && (
                 <div className="flex justify-start">
                    <div className="max-w-lg px-4 py-3 rounded-xl bg-gray-200 text-gray-800 flex items-center space-x-2">
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t bg-white">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !message.trim()}
                  className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a persona to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotBuilder;
