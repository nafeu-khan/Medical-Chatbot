import os
from dotenv import load_dotenv

import google.generativeai as genai
from pinecone import Pinecone, PodSpec
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

class MedicalChatbot:
    def __init__(self):
        self.qa_chain = None
        try:
            from django.conf import settings
            if not settings.configured:
                return
        except:
            return
        self._initialize_chatbot()
    
    def _initialize_chatbot(self):
        """Initialize the chatbot with embeddings and vector store"""
        try:
            # Try to import and initialize the full chatbot
            self.genai = genai
            self.genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
            self.pc_api_key = os.getenv("PINECONE_API_KEY")
            self.pc_environment = "us-west1-gcp"
            self.pc = Pinecone(api_key=self.pc_api_key)
            self.index_name = "medical-chatbot-gemini"
            embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
            # Create index if it doesn't exist
            if self.index_name not in self.pc.list_indexes().names():
                self.pc.create_index(
                    name=self.index_name,
                    dimension=768,
                    metric='cosine',
                    spec=PodSpec(environment=self.pc_environment)
                )
            # Initialize vector store
            self.docsearch = PineconeVectorStore.from_existing_index(
                index_name=self.index_name,
                embedding=embeddings
            )
            # Initialize LLM and QA chain with system prompt
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.0-flash",
                temperature=0,
                convert_system_message_to_human=True,
                system_message="If the provided context is not relevant, say 'Sorry, I couldn't find relevant information.'"
            )
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=llm,
                retriever=self.docsearch.as_retriever()
            )
        except Exception as e:
            print(f"Error initializing full chatbot: {e}")
            print("Using fallback chatbot implementation")
            self.qa_chain = None
    
    def get_response(self, query):
        """Get response from the medical chatbot with similarity threshold"""
        if self.qa_chain:
            try:
                # Retrieve relevant documents with scores
                # Use the underlying vectorstore for similarity search with score
                k = 4
                results = self.docsearch.similarity_search_with_score(query, k=k)
                if not results or results[0][1] < 0.5:
                    return "Sorry, I couldn't find relevant information in the knowledge base."
                # Otherwise, proceed as normal
                response = self.qa_chain.invoke({"query": query})
                return response.get('result', "I apologize, but I couldn't find a relevant answer to your question.")
            except Exception as e:
                print(f"Error getting response from full chatbot: {e}")
                return self._get_fallback_response(query)
        else:
            return self._get_fallback_response(query)
    
    def _get_fallback_response(self, query):
        """Fallback response system for when external APIs are not available"""
        query_lower = query.lower()
        
        # Medical knowledge base for common questions
        medical_responses = {
            'headache': 'Headaches can be caused by various factors including stress, dehydration, lack of sleep, or underlying medical conditions. For mild headaches, try rest, hydration, and over-the-counter pain relievers. If headaches are severe or frequent, consult a healthcare provider.',
            'fever': 'Fever is often a sign of infection. For adults, a fever above 103°F (39.4°C) requires medical attention. Stay hydrated, rest, and monitor your temperature. Contact a doctor if fever persists or is accompanied by other symptoms.',
            'cough': 'Coughing can be caused by colds, allergies, or respiratory infections. Stay hydrated, use honey for soothing, and consider over-the-counter cough suppressants. See a doctor if cough persists for more than 2 weeks.',
            'diabetes': 'Diabetes is a chronic condition affecting blood sugar regulation. Type 1 diabetes requires insulin therapy, while Type 2 can often be managed with diet, exercise, and medication. Regular monitoring and medical supervision are essential.',
            'blood pressure': 'Blood pressure should be below 120/80 mmHg for most adults. High blood pressure can lead to heart disease and stroke. Lifestyle changes like diet, exercise, and stress management can help. Regular monitoring is important.',
            'exercise': 'Regular exercise is crucial for health. Aim for 150 minutes of moderate activity weekly. Include both cardio and strength training. Start slowly and gradually increase intensity. Consult a doctor before starting a new exercise program.',
            'nutrition': 'A balanced diet should include fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, added sugars, and excessive salt. Stay hydrated with water throughout the day.',
            'sleep': 'Adults need 7-9 hours of sleep per night. Poor sleep can affect mood, memory, and health. Maintain a regular sleep schedule, create a restful environment, and avoid screens before bedtime.',
            'stress': 'Chronic stress can impact physical and mental health. Practice stress management techniques like meditation, deep breathing, exercise, and time management. Consider professional help if stress becomes overwhelming.',
            'vaccination': 'Vaccines protect against serious diseases. Follow recommended vaccination schedules for children and adults. Annual flu shots are recommended for most people. Consult your healthcare provider about specific vaccines.'
        }
        
        # Check for keywords in the query
        for keyword, response in medical_responses.items():
            if keyword in query_lower:
                return response
        
        # Default responses for general medical questions
        if any(word in query_lower for word in ['symptom', 'pain', 'hurt', 'ache']):
            return "I understand you're experiencing symptoms. While I can provide general information, it's important to consult with a healthcare provider for proper diagnosis and treatment. If symptoms are severe or persistent, seek medical attention immediately."
        
        if any(word in query_lower for word in ['treatment', 'cure', 'medicine', 'medication']):
            return "Treatment recommendations depend on the specific condition and individual factors. Always consult with a healthcare provider before starting any treatment or medication. Self-diagnosis and self-treatment can be dangerous."
        
        if any(word in query_lower for word in ['prevention', 'prevent', 'avoid']):
            return "Preventive healthcare includes regular check-ups, vaccinations, healthy lifestyle choices, and early detection of health issues. Maintain a balanced diet, exercise regularly, get adequate sleep, and avoid harmful habits like smoking."
        
        # Generic response for other questions
        return "Thank you for your medical question. While I can provide general health information, I cannot replace professional medical advice. For specific health concerns, diagnosis, or treatment, please consult with a qualified healthcare provider. If you're experiencing a medical emergency, call emergency services immediately."

# Global chatbot instance - only create if Django is configured
try:
    from django.conf import settings
    if settings.configured:
        chatbot = MedicalChatbot()
    else:
        chatbot = None
except:
    chatbot = None

def ingest_pdf_to_vector_store(pdf_path):
    """Load a PDF, split it, and ingest into the Pinecone vector store."""
    # Load and split PDF
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    texts = text_splitter.split_documents(documents)
    
    # Embeddings and Pinecone setup
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    index_name = "medical-chatbot-gemini"
    pc_api_key = os.getenv("PINECONE_API_KEY")
    pc_environment = "us-west1-gcp"
    pc = Pinecone(api_key=pc_api_key)
    if index_name not in pc.list_indexes().names():
        pc.create_index(
            name=index_name,
            dimension=768,
            metric='cosine',
            spec=PodSpec(environment=pc_environment)
        )
    docsearch = PineconeVectorStore.from_documents(
        texts,
        embeddings,
        index_name=index_name
    )
    return len(texts) 