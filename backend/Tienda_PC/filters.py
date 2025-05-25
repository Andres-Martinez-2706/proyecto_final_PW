import django_filters 
from .models import Computer

class ComputerFilter(django_filters.FilterSet):
    precio_min = django_filters.NumberFilter(field_name='precio', lookup_expr='gte', label='Precio mínimo')
    precio_max = django_filters.NumberFilter(field_name='precio', lookup_expr='lte', label='Precio máximo')
    ram = django_filters.NumberFilter(field_name='ram', lookup_expr='exact', label='RAM exacta (GB)')
    almacenamiento = django_filters.CharFilter(field_name='almacenamiento', lookup_expr='icontains')
    marca = django_filters.CharFilter(field_name='marca', lookup_expr='icontains')
    cpu = django_filters.CharFilter(field_name='cpu', lookup_expr='icontains')
    gpu = django_filters.CharFilter(field_name='gpu', lookup_expr='icontains')
    sistema_operativo = django_filters.CharFilter(field_name='sistema_operativo', lookup_expr='icontains')
    tipo_almacenamiento = django_filters.CharFilter(field_name='tipo_almacenamiento', lookup_expr='icontains')

    class Meta:
        model = Computer
        fields = [
            'marca',
            'tipo_almacenamiento',
            'cpu',
            'gpu',
            'ram',
            'almacenamiento',
            'sistema_operativo',
            'precio_min',
            'precio_max',
        ]
