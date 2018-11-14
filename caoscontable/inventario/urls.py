#from django.conf.url import url
from django.urls import path

from . import views

app_name = 'inventario'

urlpatterns = [
    path('', views.index, name='index'),
    #path('login/', views.login(), name='login'),
]