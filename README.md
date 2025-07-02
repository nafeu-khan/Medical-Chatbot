# Medical Chatbot

A comprehensive medical chatbot application built with React.js frontend and Django REST Framework backend, featuring AI-powered medical information assistance.

## Features

### Frontend (React.js + Vite + Tailwind CSS)
- **Modern UI/UX**: Beautiful, responsive design with dark/light mode support
- **Real-time Chat Interface**: Interactive chat with typing indicators and message history
- **Authentication**: JWT-based authentication with protected routes
- **Modular Architecture**: Clean component structure following DRY and SOLID principles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Backend (Django REST Framework)
- **AI-Powered Responses**: Integration with Google Gemini AI and Pinecone vector database
- **Medical Knowledge Base**: Comprehensive medical information retrieval system
- **User Management**: JWT authentication with refresh token support
- **Chat History**: Persistent storage of user conversations
- **Fallback System**: Robust fallback responses when external APIs are unavailable

### AI Capabilities
- **Medical Information**: Answers questions about symptoms, treatments, and health topics
- **Smart Responses**: Context-aware responses based on medical knowledge
- **Vector Search**: Efficient retrieval of relevant medical information
- **Scalable Architecture**: Easy to extend with additional medical knowledge sources

## 🛠️ Technology Stack

### Frontend
- **React.js**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **React Hot Toast**: User-friendly notifications
- **Axios**: HTTP client for API calls
- **JWT Authentication**: Secure token-based authentication

### Backend
- **Django REST Framework**: API development
- **Django CORS Headers**: Cross-origin resource sharing
- **JWT Authentication**: Secure token-based authentication
- **MySQL**: Database (configurable)
- **LangChain**: AI/LLM integration framework
- **Google Generative AI**: Advanced language model
- **Pinecone**: Vector database for semantic search

## 📁 Basic Project Structure

```
Medical Chatbot/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── Components/     # Reusable UI components
│   │   │   ├── ChatHeader.jsx
│   │   │   ├── ChatInput.jsx
│   │   │   ├── ChatMessage.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── Pages/          # Page components
│   │   │   ├── ChatbotPage.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── services/       # API services
│   │   │   ├── apiServices.js
│   │   │   └── chatbotService.js
│   │   ├── utility/        # Utility functions
│   │   └── hooks/          # Custom React hooks
│   ├── public/             # Static assets
│   └── package.json
├── server/                 # Backend Django application
│   ├── chatbot_app/        # Chatbot functionality
│   │   ├── models.py       # Database models
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # Data serialization
│   │   ├── utils.py        # AI chatbot logic
│   │   └── urls.py         # URL routing
│   ├── auth_app/           # Authentication app
│   ├── server/             # Django settings
│   └── requirements.txt
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- MySQL database
- Google AI API key
- Pinecone API key (optional)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Medical-Chatbot
   ```

2. **Set up Python environment**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database and API credentials
   ```

4. **Run database migrations**
   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Start the Django server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your backend URL
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
DEBUG=True
SECRET_KEY=your-secret-key
DB_ENGINE=django.db.backends.mysql
DB_NAME=medical_chatbot
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=3306
GOOGLE_API_KEY=your-google-ai-key
PINECONE_API_KEY=your-pinecone-key
```

#### Frontend (.env.local)
```env
VITE_BACKEND_BASE_URL=http://localhost:8000
VITE_LOGIN_URL=/api/auth/login/
VITE_REFRESH_TOKEN_URL=/api/auth/token/refresh/
```

## 📱 Usage

1. **Register/Login**: Create an account or sign in to access the chatbot
2. **Navigate to Chatbot**: Click on "Chatbot" in the navigation menu
3. **Ask Questions**: Type medical questions in the chat interface
4. **Get Responses**: Receive AI-powered medical information and advice
5. **View History**: Access your previous conversations

## 🤖 AI Features

### Medical Knowledge Areas
- **Symptoms**: Information about common symptoms and their causes
- **Treatments**: General treatment information and recommendations
- **Prevention**: Preventive healthcare advice
- **Lifestyle**: Health and wellness guidance
- **Emergency**: Emergency medical information

### Smart Responses
- **Context-Aware**: Responses based on the specific question asked
- **Medical Accuracy**: Information sourced from medical knowledge base
- **Safety Disclaimers**: Appropriate medical disclaimers included
- **Professional Guidance**: Recommendations to consult healthcare providers

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Authentication required for chatbot access
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation of all inputs
- **Error Handling**: Graceful error handling and user feedback

## 🧪 Testing

### Backend Testing
```bash
cd server
python manage.py test chatbot_app
```

### Frontend Testing
```bash
cd client
npm test
```



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Medical Chatbot** - Your AI-powered medical information assistant