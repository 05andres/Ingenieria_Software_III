from django.urls import path
from .views import CreditosViews, credito,abonar,listarcreditos,abonosview,alertas,lista_alertas,bloqueado,historial,historiales
from . import views
urlpatterns = [
    path('', views.credito, name='credito'),
    path('credito/',CreditosViews.as_view(),name="creditos"), 
    path('abono/', views.abonar, name='abono'),
    path('listarcreditos/', views.listarcreditos, name="listarcreditos"),
    path('abonos/',views.abonosview,name='abonos'),
    path('alertas/',views.alertas,name='alertas'),
    path('lista_alertas/',views.lista_alertas,name="lista_alertas"),
    path('bloqueo/',views.bloqueado,name="bloqueo"),
    path('historial/',views.historial,name="historial"),
    path('historiales/',views.historiales,name="historiales")
    #path('login/', views.login(), name='login'),
]