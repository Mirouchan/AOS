from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'content', 'status', 'event_type', 'created_at']
    list_filter = ['status', 'event_type']
    search_fields = ['user_id', 'content']
    readonly_fields = ['created_at', 'read_at']
