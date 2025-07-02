import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import ChatHeader from '../Components/ChatHeader';
import ChatMessage from '../Components/ChatMessage';
import ChatInput from '../Components/ChatInput';
import { sendChatMessage, getChatHistory } from '../services/chatbotService';

const ChatbotPage = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ 
            behavior: 'smooth',
            block: 'end',
            inline: 'nearest'
        });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        loadChatHistory();
    }, []);

    const loadChatHistory = async () => {
        try {
            const history = await getChatHistory();
            const formattedHistory = history.map(item => ({
                id: item.id,
                message: item.message,
                response: item.response,
                timestamp: item.timestamp,
                isUser: false
            }));

            // Interleave user messages and bot responses
            const interleavedMessages = [];
            formattedHistory.forEach(item => {
                interleavedMessages.push({
                    id: `user-${item.id}`,
                    message: item.message,
                    timestamp: item.timestamp,
                    isUser: true
                });
                interleavedMessages.push({
                    id: `bot-${item.id}`,
                    message: item.response,
                    timestamp: item.timestamp,
                    isUser: false
                });
            });

            setMessages(interleavedMessages);
        } catch (error) {
            console.error('Failed to load chat history:', error);
        }
    };

    const handleSendMessage = async (messageText) => {
        if (!messageText.trim()) return;

        const userMessage = {
            id: Date.now(),
            message: messageText,
            timestamp: new Date().toISOString(),
            isUser: true
        };

        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await sendChatMessage(messageText);

            const botMessage = {
                id: response.id,
                message: response.response,
                timestamp: response.timestamp,
                isUser: false
            };

            setMessages(prev => [...prev, botMessage]);
            setIsOnline(true);
        } catch (error) {
            console.error('Failed to send message:', error);
            setIsOnline(false);

            const errorMessage = {
                id: Date.now(),
                message: 'Sorry, I encountered an error. Please try again later.',
                timestamp: new Date().toISOString(),
                isUser: false
            };

            setMessages(prev => [...prev, errorMessage]);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
            <ChatHeader isOnline={isOnline} />

            <div className="flex-1 overflow-hidden">
                <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                        <div className="max-w-4xl mx-auto p-4 space-y-4 min-h-full flex flex-col">
                            {messages.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                                            Welcome to Medical AI Assistant
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
                                            Ask me anything about medical information, symptoms, treatments, or health-related questions. I'm here to help with accurate and reliable medical insights.
                                        </p>
                                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                                            <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                                                💊 Medicine Information
                                            </div>
                                            <div className="px-4 py-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm">
                                                🩺 Symptom Analysis
                                            </div>
                                            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm">
                                                📚 Health Education
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1">
                                        {messages.map((message, index) => (
                                            <div key={message.id} className="mb-6">
                                                <ChatMessage
                                                    message={message.message}
                                                    isUser={message.isUser}
                                                    timestamp={message.timestamp}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div ref={messagesEndRef} />
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg">
                        <div className="max-w-4xl mx-auto">
                            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPage; 