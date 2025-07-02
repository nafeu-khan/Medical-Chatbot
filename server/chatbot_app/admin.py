from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['user', 'message', 'timestamp']
    list_filter = ['timestamp', 'user']
    search_fields = ['message', 'response', 'user__username']
    readonly_fields = ['timestamp']
