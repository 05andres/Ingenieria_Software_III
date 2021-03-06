from django.http import HttpResponse,HttpResponseRedirect
from django.shortcuts import render,get_object_or_404
from .forms import creditosform
from django import forms
from .models import creditos,client,Abonos,bloqueo
from django.views.generic import View
import time
from datetime import datetime,timedelta
from django.utils import timezone
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import redirect
from django.core.serializers import serialize
from itertools import chain





def credito(request):
    cliente = client.objects.all()
    credito = creditos.objects.all()
    print (cliente)
    return render(request, 'cartera/index.html')
    #return HttpResponse("Hello, world. You're at the polls index.")

class CreditosViews(View):
    def get(self, request):
        creditos_form = creditosform()
        return render(request, 'cartera/creditos.html', {
            'creditos_form':creditos_form,
        })

    def post(self,request):
        if request.method == 'POST':
            creditos_form= creditosform(request.POST,request.FILES)
            if creditos_form.is_valid():
                fecha_inicio =  datetime.now(tz=timezone.utc)
                tiempo = request.POST.get('Tiempo_credito')
                iden = request.POST.get('indentificacion')
                ident=client.objects.get(identificacion = iden)
                dias = timedelta(days=int(tiempo))
                print (tiempo,fecha_inicio)
                new_credito=creditos_form.save(commit=False)
                new_credito.Fecha_max_pago = fecha_inicio+dias
                new_credito.cliente = ident
                new_credito.save()
                return redirect(reverse_lazy('creditos'))
        
            return render(request, 'cartera/creditos.html', {
            'creditos_form':creditos_form,
        })

def abonar(request):
    return render(request, 'cartera/abono.html')

def listarcreditos(request):
    if request.method == 'POST':
        identicacion = request.POST['iden']
        lis_creditos = creditos.objects.filter(indentificacion=identicacion)
        print (lis_creditos)
        data=serialize('json',lis_creditos)
        print (data)
        return JsonResponse(data,safe=False)
    return JsonResponse(data,safe=False)

def abonosview(request):
    data={}
    if request.method == "POST":
        valor = request.POST['precio']
        iden = request.POST['id']
        cedula =  request.POST['cedula']
        valor_total = request.POST['valor_total']
        valor_resta = int(valor_total)-int(valor)
        identificacion = creditos.objects.get(id=iden)
        cedulas = client.objects.get(identificacion=cedula)
        print(valor,iden,cedula,valor_total,valor_resta)
        abono = Abonos(abono=identificacion,cliente=cedulas,valor_Abonar=valor,total_pegar=valor_resta)
        identificacion.valor=valor_resta
        identificacion.save()
        abono.save()
        data['mensaje']="se realizo el abono satisfactoriamente"
        '''
        data= serialize('json',identificacion)
        print(data)
        '''
    return JsonResponse(data,safe=False)

def lista_alertas(request):
    print("hola")
    date={}
    if request.method == "GET":
        fecha_alertas=creditos.objects.all()
        data=serialize('json',fecha_alertas)
        print("las fechas son :",data)
    return JsonResponse(data,safe=False)

def alertas(request):
    return render(request, 'cartera/alertas.html')

def bloqueado(request):
    data={}
    if request.method == "POST":
        cedula =  request.POST['id']
        print(cedula)
        bloqueos = bloqueo(identificacion=cedula)
        bloqueos.save()
        data['mensaje']="el usario ha sido bloquedo"
    return JsonResponse(data,safe=False)

def historial(request):
    return render(request, 'cartera/historial.html')

def historiales(request):
    data={}
    if request.method == "POST":
        cedula =  request.POST['iden']
        lista_creditos = creditos.objects.filter(cliente=cedula)
        lista_abono = Abonos.objects.filter(cliente=cedula)
        print(lista_creditos,lista_abono)
        report = list(chain(lista_abono,lista_creditos))
        print(report)
        data=serialize('json',report)
        print(data)
    return JsonResponse(data,safe=False)



    



        

        



