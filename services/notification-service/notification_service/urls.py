from django.contrib import admin
from django.urls import path, include

from django.http import JsonResponse

def health(request):
    return JsonResponse({"status": "ok"})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('notifications.urls')),  
    path('health/', health), 
    path('api/auth/', include('notifications.urls_auth')),  

]