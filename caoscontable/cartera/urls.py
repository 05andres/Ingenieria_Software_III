from django.urls import path
from .views import CreditosViews, credito,abonar,listarcreditos
from . import views
urlpatterns = [
    path('', views.credito, name='credito'),
    path('credito/',CreditosViews.as_view(),name="creditos"), 
    path('abono/', views.abonar, name='abono'),
    path('listarcreditos/', views.listarcreditos, name="listarcreditos"),
    #path('login/', views.login(), name='login'),
]