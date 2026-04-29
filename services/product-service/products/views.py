from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer