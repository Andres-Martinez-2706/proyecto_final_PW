# Generated by Django 5.1.7 on 2025-05-21 21:54

import tinymce.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Tienda_PC', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='computer',
            name='almacenamiento',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='computer',
            name='descripcion',
            field=tinymce.models.HTMLField(default='.'),
            preserve_default=False,
        ),
    ]
