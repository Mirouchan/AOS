from django.urls import path
from .views import CreateOrderView, MyOrdersView, OrderDetailView

urlpatterns = [
    path('orders/', CreateOrderView.as_view()),
    path('orders/my/', MyOrdersView.as_view()),
    path('orders/<uuid:pk>/', OrderDetailView.as_view()),
]