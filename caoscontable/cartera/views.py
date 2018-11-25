from django.http import HttpResponse
from django.shortcuts import render,get_object_or_404
from .forms import creditosform
from django import forms
from .models import creditos,client
from django.views.generic import View
import time
from datetime import datetime,timedelta
from django.utils import timezone
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import redirect
from django.core.serializers import serialize




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