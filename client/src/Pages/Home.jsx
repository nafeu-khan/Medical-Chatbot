import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Medical AI Assistant
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Your intelligent medical companion powered by AI. Get instant answers to your health questions,
          understand symptoms, and receive reliable medical information.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/mql/chatbot"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Start Chatting
          </Link>
          <Link
            to="/signup"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-semibold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI-Powered Responses
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get intelligent, accurate answers to your medical questions using advanced AI technology.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Secure & Private
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your conversations are secure and private. We prioritize your data protection.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Instant Access
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get immediate answers 24/7. No waiting, no appointments - just reliable medical information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
