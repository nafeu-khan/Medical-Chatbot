from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

# Create your models here.

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='chat_messages')
    message = models.TextField()
    response = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-timestamp']
    
    def __str__(self):
        return f"{self.user.username} - {self.timestamp}"

class UploadedPDF(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='uploaded_pdfs')
    file = models.FileField(upload_to='pdfs/')
    original_filename = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.original_filename} uploaded by {self.user.username} at {self.uploaded_at}"
