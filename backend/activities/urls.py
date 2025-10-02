from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActivityViewSet, WeddingInfoViewSet

router = DefaultRouter()
router.register(r'activities', ActivityViewSet, basename='activity')
router.register(r'wedding-info', WeddingInfoViewSet, basename='wedding-info')

urlpatterns = [
        path('', include(router.urls))
]
