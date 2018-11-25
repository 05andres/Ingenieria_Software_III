from django.db import models
from accounts.models import client
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _
def validate_even(value):
    try:
        cliente = client.objects.get(identificacion=value)
        bandera=True
    except client.DoesNotExist:
        bandera=False
    if bandera == False :
        raise ValidationError(
            _('%(value)s NO esta registrado'),
            params={'value': value},
        )

def validatar_credito(value):
    try:
        cliente = creditos.objects.get(identificacion=value)
        bandera=True
    except creditos.DoesNotExist:
        bandera=False
    if bandera == False :
        raise ValidationError(
            _('%(value)s el cliente no tiene un credito vigente'),
            params={'value': value},
        )

# Create your models here.
class creditos(models.Model):
    cliente = models.ForeignKey(client,on_delete=models.CASCADE)
    indentificacion=models.IntegerField(verbose_name="Identificacion del cliente",validators=[validate_even])
    valor = models.IntegerField()
    Tiempo_credito = models.IntegerField()
    Fecha_compra = models.DateField(auto_now_add=True,verbose_name="Fecha de compra")
    Fecha_max_pago = models.DateTimeField(verbose_name="Fecha max de pago",null=True)

    class Meta:
        verbose_name = "credito"
        verbose_name_plural = "creditos"
        ordering = ["Fecha_compra"]
    
    

class Abonos(models.Model):
    abono = models.ForeignKey(creditos,on_delete=models.CASCADE)
    cliente = models.ForeignKey(client,on_delete=models.CASCADE)
    indentificacion=models.IntegerField(verbose_name="Identificacion del cliente",validators=[validatar_credito])
    valor_Abonar=models.IntegerField(verbose_name="Total a abonar")
    total_pegar=models.IntegerField(null=True)
    Fecha_abono = models.DateField(auto_now_add=True,verbose_name="Fecha de abono")

    class Meta:
        verbose_name = "Abono"
        verbose_name_plural = "Abonos"
        ordering = ["Fecha_abono"]
    
    

