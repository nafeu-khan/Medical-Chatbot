import { fetchWithAuth } from './apiServices';

const API_BASE = import.meta.env.VITE_BACKEND_BASE_URL;

export const sendChatMessage = async (message) => {
  const res = await fetchWithAuth(`${API_BASE}/chatbot/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  
  if (!res.ok) {
    throw new Error('Failed to send message');
  }
  
  return res.json();
};

export const getChatHistory = async () => {
  const res = await fetchWithAuth(`${API_BASE}/chatbot/chat/history/`);
  
  if (!res.ok) {
    throw new Error('Failed to fetch chat history');
  }
  
  return res.json();
};

export const uploadPDF = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetchWithAuth(`${API_BASE}/chatbot/upload-pdf/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    throw new Error('Failed to upload PDF');
  }
  return res.json();
};

export const fetchUploadedPDFs = async () => {
  const res = await fetchWithAuth(`${API_BASE}/chatbot/uploaded-pdfs/`);
  if (!res.ok) {
    throw new Error('Failed to fetch uploaded PDFs');
  }
  return res.json();
}; 