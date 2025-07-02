from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from .models import ChatMessage, UploadedPDF
from .serializers import ChatMessageSerializer, ChatRequestSerializer, UploadedPDFSerializer
from .utils import chatbot, ingest_pdf_to_vector_store

# Create your views here.

class ChatView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """Handle chat messages and return AI response"""
        serializer = ChatRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                serializer.errors, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        message = serializer.validated_data['message']
        
        try:
            # Get response from medical chatbot
            response = chatbot.get_response(message)
            
            # Save chat message to database
            chat_message = ChatMessage.objects.create(
                user=request.user,
                message=message,
                response=response
            )
            
            return Response({
                'message': message,
                'response': response,
                'timestamp': chat_message.timestamp,
                'id': chat_message.id
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'An error occurred while processing your request.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """Get chat history for the authenticated user"""
        try:
            # Get recent chat messages (last 50)
            chat_messages = ChatMessage.objects.filter(
                user=request.user
            ).order_by('-timestamp')[:50][::-1]
            serializer = ChatMessageSerializer(chat_messages, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({
                'error': 'An error occurred while fetching chat history.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PDFUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UploadedPDFSerializer(data=request.data)
        if serializer.is_valid():
            pdf_file = request.FILES['file']
            uploaded_pdf = UploadedPDF.objects.create(
                user=request.user,
                file=pdf_file,
                original_filename=pdf_file.name
            )
            # Ingest PDF into vector store
            try:
                chunk_count = ingest_pdf_to_vector_store(uploaded_pdf.file.path)
                return Response({
                    'id': uploaded_pdf.id,
                    'original_filename': uploaded_pdf.original_filename,
                    'uploaded_at': uploaded_pdf.uploaded_at,
                    'chunk_count': chunk_count,
                    'message': 'PDF uploaded and ingested successfully.'
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    'id': uploaded_pdf.id,
                    'original_filename': uploaded_pdf.original_filename,
                    'uploaded_at': uploaded_pdf.uploaded_at,
                    'error': str(e),
                    'message': 'PDF uploaded but ingestion failed.'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UploadedPDFListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        pdfs = UploadedPDF.objects.filter(user=request.user).order_by('-uploaded_at')
        serializer = UploadedPDFSerializer(pdfs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
