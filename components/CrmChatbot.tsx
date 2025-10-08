import React, { useState, useEffect, useRef } from 'react';
import type { Lead } from '../types';
import { generateCrmChatResponse } from '../services/geminiService';
import { ChatbotIcon } from './icons/ChatbotIcon';

interface CrmChatbotProps {
    leads: Lead[];
    isOpen: boolean;
    onClose: () => void;
}

const CrmChatbot: React.FC<CrmChatbotProps> = ({ leads, isOpen, onClose }) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
            if (messages.length === 0) {
                 setMessages([{
                    role: 'model',
                    text: 'Hello! I am your CRM Assistant. How can I help you with your leads today? You can ask things like "Who are the new leads?" or "Suggest a follow up for John Doe".'
                }]);
            }
        } else {
            // Allows for exit animation
            setIsVisible(false);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { role: 'user' as const, text: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        const apiHistory = messages.map(msg => ({
            role: msg.role,
            parts: [{ text: msg.text }]
        }));

        try {
            const responseText = await generateCrmChatResponse(leads, apiHistory, currentInput);
            const modelMessage = { role: 'model' as const, text: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = { role: 'model' as const, text: "Sorry, I ran into an issue. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${isVisible ? 'bg-black bg-opacity-50' : 'bg-opacity-0'}`} 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chatbot-title"
        >
            <div 
                className={`relative w-full max-w-md h-full bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
                    <div className="flex items-center">
                        <ChatbotIcon className="h-6 w-6 text-primary mr-3" />
                        <h3 id="chatbot-title" className="text-lg font-semibold text-gray-800">CRM Assistant</h3>
                    </div>
                    <button onClick={onClose} className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-800" aria-label="Close chat">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl whitespace-pre-wrap ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
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
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t bg-white flex-shrink-0">
                    <div className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={e => e.key === 'Enter' && handleSend()}
                            placeholder="Ask about your leads..."
                            className="flex-1 w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CrmChatbot;