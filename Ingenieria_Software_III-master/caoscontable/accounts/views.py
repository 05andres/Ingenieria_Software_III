from django.http import HttpResponse
from django.shortcuts import render,get_object_or_404

from django.contrib.auth import authenticate, login

from . import models

def index(request):
    return render(request, 'accounts/index.html')
    #return HttpResponse("Hello, world. You're at the polls index.")

def registrarse(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Redirect to a success page.
            return render(request,'accounts/index.html')
        else:
            # Return an 'invalid login' error message.
            return render(request,'accounts/index.html')

    return render(request, 'accounts/login.html')