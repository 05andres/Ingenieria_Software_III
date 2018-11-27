from django.urls import path, include
#from django.contrib.auth  import views as auth_views
from . import views 

from django.contrib.auth import authenticate,login

#app_name = 'accounts'

urlpatterns = [
    path('', views.index, name='index'),
    #path('login/', views.registrarse, name='login'),
    #path('/login', include('django.contrib.auth.urls')),
    #path('log_in', auth_views.login, name ='login'),

]