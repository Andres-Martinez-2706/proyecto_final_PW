from django.contrib import admin
from .models import Computer
from tinymce.widgets import TinyMCE
from django.db import models



# Register your models here.
class NotaAdmin(admin.ModelAdmin):
    formfield_overrides = {
        models.TextField: {'widget': TinyMCE(
            attrs={'cols': 80, 'rows': 30},
            mce_attrs={
                'plugins': 'advlist autolink lists link image charmap print preview anchor '
                           'searchreplace visualblocks code fullscreen insertdatetime media table emoticons',
                'toolbar': 'undo redo | formatselect | bold italic underline | '
                           'alignleft aligncenter alignright alignjustify | '
                           'bullist numlist outdent indent | link image table | emoticons | code fullscreen',
                'menubar': True,
            }
        )}
    }

admin.site.register(Computer, NotaAdmin)