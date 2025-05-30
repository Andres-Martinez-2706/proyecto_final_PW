# Generated by Django 5.1.7 on 2025-05-18 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Computer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marca', models.CharField(max_length=100)),
                ('tipo_almacenamiento', models.CharField(max_length=100)),
                ('modelo', models.CharField(max_length=100)),
                ('cpu', models.CharField(max_length=100)),
                ('gpu', models.CharField(blank=True, max_length=100, null=True)),
                ('ram', models.PositiveIntegerField(help_text='Capacidad de RAM en GB')),
                ('almacenamiento', models.PositiveIntegerField(help_text='Capacidad de almacenamiento en GB')),
                ('sistema_operativo', models.CharField(max_length=100)),
                ('precio', models.DecimalField(decimal_places=2, max_digits=10)),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='computers/')),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('fecha_publicacion', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-fecha_publicacion'],
            },
        ),
    ]
