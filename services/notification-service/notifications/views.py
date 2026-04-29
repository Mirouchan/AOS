from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification


# =========================
# 🔐 Helper
# =========================
def get_user_id(request):
    return request.headers.get("X-User-Id")


# =========================
# 📩 ALL NOTIFICATIONS
# =========================
class MyNotificationsView(APIView):

    def get(self, request):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        notifications = Notification.objects.filter(user_id=user_id).values(
            'id', 'content', 'status', 'event_type', 'created_at', 'read_at'
        )

        return Response({
            "notifications": list(notifications),
            "count": notifications.count()
        })


# =========================
# 📭 UNREAD NOTIFICATIONS
# =========================
class UnreadNotificationsView(APIView):

    def get(self, request):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        notifications = Notification.objects.filter(
            user_id=user_id,
            status='unread'
        ).values('id', 'content', 'event_type', 'created_at')

        return Response({
            "unread_count": notifications.count(),
            "notifications": list(notifications)
        })


# =========================
# ✅ MARK AS READ
# =========================
class MarkAsReadView(APIView):

    def put(self, request, notification_id):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        try:
            notification = Notification.objects.get(
                id=notification_id,
                user_id=user_id
            )

            notification.status = 'read'
            notification.read_at = timezone.now()
            notification.save()

            return Response({
                "message": "Notification marked as read"
            })

        except Notification.DoesNotExist:
            return Response({
                "error": "Notification not found"
            }, status=404)


# =========================
# 🗑️ DELETE NOTIFICATION
# =========================
class DeleteNotificationView(APIView):

    def delete(self, request, notification_id):
        user_id = get_user_id(request)

        if not user_id:
            return Response({"error": "Unauthorized"}, status=401)

        try:
            notification = Notification.objects.get(
                id=notification_id,
                user_id=user_id
            )

            notification.delete()

            return Response({
                "message": "Notification deleted"
            })

        except Notification.DoesNotExist:
            return Response({
                "error": "Notification not found"
            }, status=404)


# =========================
# ❤️ HEALTH CHECK
# =========================
class HealthCheckView(APIView):

    def get(self, request):
        return Response({
            "status": "healthy",
            "service": "notification-service"
        })