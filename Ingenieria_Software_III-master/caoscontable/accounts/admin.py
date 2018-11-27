from django.contrib import admin

# Register your models here.
from .models import client,usuario_administrador,usuario_operador
admin.site.register(client)
admin.site.register(usuario_administrador)
admin.site.register(usuario_operador)