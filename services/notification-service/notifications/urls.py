from django.urls import path
from . import views

urlpatterns = [
    path('notifications/me', views.MyNotificationsView.as_view()),
    path('notifications/me/unread', views.UnreadNotificationsView.as_view()),
    path('notifications/<int:notification_id>/read', views.MarkAsReadView.as_view()),
   
     
      path('health', views.HealthCheckView.as_view()),
]