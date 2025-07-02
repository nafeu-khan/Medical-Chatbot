from rest_framework import serializers
from .models import ChatMessage, UploadedPDF

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'message', 'response', 'timestamp']
        read_only_fields = ['id', 'timestamp']

class ChatRequestSerializer(serializers.Serializer):
    message = serializers.CharField(max_length=1000)

class UploadedPDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedPDF
        fields = ['id', 'file', 'original_filename', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at', 'original_filename']

    def validate_file(self, value):
        if not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError('Only PDF files are allowed.')
        return value 