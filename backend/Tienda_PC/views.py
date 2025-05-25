from rest_framework import viewsets,filters,generics
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from .models import Computer
from .serializers import ComputerSerializer, RegisterSerializer
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ComputerFilter

# Create your views here.
class ComputerView(viewsets.ModelViewSet):
    queryset = Computer.objects.all()
    serializer_class = ComputerSerializer

    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ComputerFilter
    
    #campos permitidos ordenar
    ordering_fields = [ 'tipo_almacenamiento','ram', 'almacenamiento', 'precio','fecha_publicacion']

    
    
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    
    
    
