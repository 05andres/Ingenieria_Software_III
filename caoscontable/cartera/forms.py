from .models import creditos , Abonos
from django import forms



class creditosform(forms.ModelForm):
    class Meta:
        model = creditos
        fields = ('indentificacion','valor','Tiempo_credito',)

