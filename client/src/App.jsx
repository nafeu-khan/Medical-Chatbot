import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "regenerator-runtime/runtime";
import { Toaster } from "react-hot-toast";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ChatbotPage from "./Pages/ChatbotPage";
import KnowledgeBasePage from "./Pages/KnowledgeBasePage";
import PrivateRoute from "./utility/PrivateRoute";

function App() {
  return (
    <div className="p-6 px-8 dark:bg-gray-900 min-h-screen flex flex-col">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/mql" element={<Home />} />
          <Route
            path="/mql/chatbot"
            element={
                <ChatbotPage />
            }
          />
          <Route
            path="/mql/knowledge-base"
            element={
                <KnowledgeBasePage />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/mql" replace />} />
        </Routes>
      </main>
      {/* <Footer /> */}

    </div>
  );
}

export default App;
