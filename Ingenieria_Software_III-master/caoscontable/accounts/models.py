from django.db import models

class client(models.Model):
    identificacion = models.IntegerField(primary_key = True)
    nombres = models.CharField(max_length = 50)
    apellido1 = models.CharField(max_length = 50)
    apellido2 = models.CharField(max_length = 50)
    credito_aprobado = models.BooleanField()

class usuario_administrador(models.Model):
    identificacion = models.IntegerField(primary_key = True)
    nombres = models.CharField(max_length = 50)
    apellido1 = models.CharField(max_length = 50)
    apellido2 = models.CharField(max_length = 50)
    alertacliente = models.CharField(max_length = 50)
    alertaproducto = models.CharField(max_length = 50)

class usuario_operador(models.Model):
    identificacion = models.IntegerField(primary_key = True)
    nombres = models.CharField(max_length = 50)
    apellido1 = models.CharField(max_length = 50)
    apellido2 = models.CharField(max_length = 50)