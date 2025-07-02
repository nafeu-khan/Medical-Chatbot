import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const ChatMessage = ({ message, isUser, timestamp }) => {
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // Custom renderer for code blocks
    const renderers = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <pre className="rounded-lg overflow-x-auto my-2 bg-gray-900 text-white p-3">
                    <code
                        className={className}
                        dangerouslySetInnerHTML={{
                            __html: Prism.highlight(String(children).replace(/\n$/, ''), Prism.languages[match[1]] || Prism.languages.javascript, match[1])
                        }}
                    />
                </pre>
            ) : (
                <code {...props} style={{ background: 'rgba(229,231,235,0.5)', borderRadius: '0.25rem', padding: '0.1em 0.3em' }}>
                    {children}
                </code>
            );
        }
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`group flex ${isUser ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3 max-w-3xl ${isUser ? 'space-x-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 ${isUser ? 'ml-3' : 'mr-3'}`}>
                    {isUser ? (
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                    ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-md">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Message Content */}
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} flex-1`}>
                    <div
                        className={`relative px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 group-hover:shadow-md ${
                            isUser
                                ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-br-md'
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-bl-md'
                        }`}
                    >
                        {/* Message arrow */}
                        <div className={`absolute top-4 ${isUser ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-2 h-2 rotate-45 ${
                            isUser ? 'bg-blue-500' : 'bg-white dark:bg-gray-800 border-l border-b border-gray-100 dark:border-gray-700'
                        }`}></div>

                        <div className={`prose ${isUser ? 'prose-invert' : 'dark:prose-invert'} text-sm max-w-none leading-relaxed`}>
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={renderers}
                            >
                                {message}
                            </ReactMarkdown>
                        </div>
                    </div>

                    {/* Timestamp */}
                    {timestamp && (
                        <p className={`text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                            isUser ? 'text-blue-400' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                            {formatTime(timestamp)}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatMessage; 