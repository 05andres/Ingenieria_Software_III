from django.http import HttpResponse
from django.shortcuts import render,get_object_or_404

from django.contrib.auth import authenticate, login


def index(request):
    return render(request, 'accounts/base.html')
    #return HttpResponse("Hello, world. You're at the polls index.")