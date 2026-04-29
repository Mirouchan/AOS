from django.db import models

class Notification(models.Model):
    STATUS_CHOICES = [
        ('unread', 'Non lu'),
        ('read', 'Lu'),
    ]
    
    user_id = models.IntegerField()
    content = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='unread')
    event_type = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user_id']),
            models.Index(fields=['status']),
        ]
    
    def __str__(self):
        return f"Notification {self.id} for user {self.user_id}"
