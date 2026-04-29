from django.urls import path
from .views import verify

urlpatterns = [
    path("verify", verify),
]