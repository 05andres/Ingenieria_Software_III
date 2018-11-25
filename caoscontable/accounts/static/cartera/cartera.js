$(document).ready(function() {
    $('#botonenviar').on('click', function() {
        var csrftoken = getCookie('csrftoken');
        if (validaForm()) {
            var identificacion = $("#nombre").val()
            $('input[type="text"]').val('');
            console.log(identificacion)
            $.ajax({
                    type: "POST",
                    url: "/listarcreditos/",
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
                    console.log(json)
                    console.log(json.length)
                    if (json.length == 0) {
                        alert("el usuario no tiene un credito disponible");
                        console.log(Response);
                    } else {
                        var html;
                        $.each(json, function(index, element) {
                            //you can also use a templating engine like Underscore.js (the one I use), Mustache.js, Handlebars.js  http://garann.github.io/template-chooser/
                            html = '<li><strong>' + element.fields.indentificacion + '</strong> - <em> ' + element.fields.valor + '</em> - <span> ' + element.fields.Tiempo_credito + '</span><p><input type="submit" class="btn btn-primary btn-block" value="abonar"></p></li>';

                            $('body').append(html);
                        });


                    }


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