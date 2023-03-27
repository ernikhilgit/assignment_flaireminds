
from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from product.views import ProductAPI

router = DefaultRouter()
router.register('product', ProductAPI,basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(router.urls)),
]
