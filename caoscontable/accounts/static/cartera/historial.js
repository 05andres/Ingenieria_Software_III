$(document).ready(function() {
    $('#botonenviar').on('click', function() {
        var csrftoken = getCookie('csrftoken');
        if (validaForm()) {
            var identificacion = $("#nombre").val()
            $('input[type="number"]').val('');
            console.log(identificacion)
            $.ajax({
                    type: "POST",
                    url: "/historiales/",
                    data: {
                        iden: identificacion,
                    },

                    beforeSend: function(xhr, settings) {
                        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                            xhr.setRequestHeader("X-CSRFToken", csrftoken);
                        }
                    },


                    dataType: 'json',
                    cache: false

                })
                .done(function(response) {
                    var json = JSON.parse(response)
                    if (json.length == 0) {
                        alert("el usuario no tiene un credito disponible o no esta registrado");
                    }
                    var html;
                    var html2;


                    $.each(json, function(index, element) {

                        if (element.model === "cartera.abonos") {
                            html = '<div id=abonar <h1><strong>ABONOS</strong></h1>'
                            html += ' <li><strong>factura:</strong><strong>' + element.fields.abono + '</strong> - <em><strong>cliente:</strong><strong>' + element.fields.cliente + '</strong> - <em><strong>valor abonado:</strong> ' + element.fields.valor_Abonar + '</em> - <span><strong>total a pagar:</strong> ' + element.fields.total_pegar + '</span></li>';
                            html += '</div>'
                            $('body').append(html);

                        }
                        if (element.model === "cartera.creditos") {
                            html2 = '<div id=creditos <h1><strong>CREDITOS</strong></h1>'
                            html2 += ' <li><strong>factura:</strong><strong>' + element.pk + '</strong> - <em><strong>cliente:</strong><strong>' + element.fields.cliente + '</strong> - <em><strong>valor total:</strong> ' + element.fields.valor + '</em> - <span><strong>tiempo credito:</strong> ' + element.fields.Tiempo_credito + '</span></li>';
                            html2 += '</div>'
                            $('body').append(html2);



                        }




                    });



                });

        }
    });
});


function validaForm() {
    // Campos de texto
    if ($("#nombre").val() == "") {
        alert("El campo Nombre no puede estar vacío.");
        $("#nombre").focus(); // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    if ($("#nombre").val() == "") {
        alert("El campo Nombre no puede estar vacío.");
        $("#nombre").focus(); // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
        return false;
    }
    return true; // Si todo está correcto
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}