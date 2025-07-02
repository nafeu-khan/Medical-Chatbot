import React, { useState, useRef, useEffect } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !isLoading) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    return (
        <div className="p-4 bg-white dark:bg-gray-800">
            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Character count and tips */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                        <span>💡 Press Shift + Enter for new line</span>
                        <span>📊 {message.length}/2000 characters</span>
                    </div>
                    {message.length > 1800 && (
                        <span className="text-amber-500">Approaching character limit</span>
                    )}
                </div>

                {/* Input area */}
                <div className="flex items-end space-x-3">
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe your symptoms, ask about treatments, or upload a medical document for analysis..."
                            className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none transition-all duration-200 text-sm leading-relaxed placeholder-gray-400 dark:placeholder-gray-500"
                            rows="1"
                            disabled={isLoading}
                            maxLength={2000}
                            style={{ 
                                minHeight: '52px', 
                                maxHeight: '120px',
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#d1d5db transparent'
                            }}
                        />
                        
                        {/* Message length indicator */}
                        <div className="absolute bottom-2 right-3 pointer-events-none">
                            <div className={`w-2 h-2 rounded-full transition-colors ${
                                message.length === 0 ? 'bg-gray-300' :
                                message.length < 1000 ? 'bg-green-400' :
                                message.length < 1500 ? 'bg-yellow-400' :
                                message.length < 1800 ? 'bg-orange-400' : 'bg-red-400'
                            }`}></div>
                        </div>
                    </div>

                    {/* Send button */}
                    <button
                        type="submit"
                        disabled={!message.trim() || isLoading || message.length > 2000}
                        className={`group relative overflow-hidden px-6 py-3 rounded-xl font-medium transition-all duration-300 transform ${
                            message.trim() && !isLoading && message.length <= 2000
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="hidden sm:inline">Thinking...</span>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                                <span className="hidden sm:inline">Send</span>
                            </div>
                        )}
                    </button>
                </div>

                {/* Quick action buttons */}
                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={() => setMessage('What are the symptoms of ')}
                        className="px-3 py-1 text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                        disabled={isLoading}
                    >
                        🩺 Ask about symptoms
                    </button>
                    <button
                        type="button"
                        onClick={() => setMessage('What is the treatment for ')}
                        className="px-3 py-1 text-xs bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                        disabled={isLoading}
                    >
                        💊 Treatment options
                    </button>
                    <button
                        type="button"
                        onClick={() => setMessage('Is it normal to experience ')}
                        className="px-3 py-1 text-xs bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                        disabled={isLoading}
                    >
                        ❓ General question
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInput; 