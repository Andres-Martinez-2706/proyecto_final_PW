from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import ComputerView, RegisterView

#crear un enrutador
router = DefaultRouter()
router.register(r'computer',ComputerView)

#incluir las urls del enrutador
urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
]

