from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProductSerializer
from .models import Product


class ProductAPI(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    def get_queryset(self):
        return Product.objects.order_by('weekday')


