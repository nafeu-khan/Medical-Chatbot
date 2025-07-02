from django.urls import path
from . import views
from .views import PDFUploadView, UploadedPDFListView

app_name = 'chatbot_app'

urlpatterns = [
    path('chat/', views.ChatView.as_view(), name='chat'),
    path('chat/history/', views.ChatHistoryView.as_view(), name='chat_history'),
    path('upload-pdf/', PDFUploadView.as_view(), name='upload-pdf'),
    path('uploaded-pdfs/', UploadedPDFListView.as_view(), name='uploaded-pdfs'),
] 