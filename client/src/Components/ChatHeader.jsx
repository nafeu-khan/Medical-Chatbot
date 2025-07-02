import React from 'react';

const ChatHeader = ({ isOnline = true }) => {
    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm">
            <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 shadow-sm transition-all duration-300 ${
                            isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                        }`}></div>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Medical AI Assistant
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                            <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            <span>{isOnline ? 'Online - Ready to help with your medical questions' : 'Offline - Please try again later'}</span>
                        </p>
                    </div>
                </div>

                {/* Additional info */}
                <div className="hidden md:flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Secure & Private</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>AI Powered</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader; 