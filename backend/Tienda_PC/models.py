from django.db import models
from tinymce.models import HTMLField

# Create your models here.

class Computer(models.Model):
    marca = models.CharField(max_length=100)
    tipo_almacenamiento = models.CharField(max_length=100)
    modelo = models.CharField(max_length=100)
    cpu = models.CharField(max_length=100)
    gpu = models.CharField(max_length=100, blank=True, null=True)
    ram = models.PositiveIntegerField(help_text="Capacidad de RAM en GB")
    almacenamiento = models.CharField(max_length=100)
    sistema_operativo = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(upload_to='computers/', blank=True, null=True)
    descripcion = HTMLField()
    fecha_publicacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.marca} {self.modelo} - {self.cpu} - {self.ram}GB RAM"

    class Meta:
        ordering = ['-fecha_publicacion']
    


