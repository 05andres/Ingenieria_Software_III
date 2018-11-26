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
                    var valor = 0;
                    var json = JSON.parse(response)
                    if (json.length == 0) {
                        alert("el usuario no tiene un credito disponible");
                    } else {
                        var html;
                        $.each(json, function(index, element) {
                            //you can also use a templating engine like Underscore.js (the one I use), Mustache.js, Handlebars.js  http://garann.github.io/template-chooser/
                            html = '<div id=abonar <li><strong>' + element.fields.indentificacion + '</strong> - <em> ' + element.fields.valor + '</em> - <span> ' + element.fields.Tiempo_credito + '</span></li>';
                            html += 'Valor abonar: <input class=valor data-id="' + element.pk + '" data-cel="' + element.fields.indentificacion + '" data-valor="' + element.fields.valor + '" type="number" name="fname"  required="required"><br></br>';
                            html += '<button>agregar abono</button>';
                            html += '</div>'
                            console.log(element.pk);

                            $('body').append(html);
                        });
                        $('body').on('click', '#abonar button', function(event) {
                            event.preventDefault();
                            var precio = +$(this).closest('#abonar').find('.valor').val();
                            var id = +$(this).closest('#abonar').find('.valor').data('id');
                            var cedula = +$(this).closest('#abonar').find('.valor').data('cel');
                            var valor_total = +$(this).closest('#abonar').find('.valor').data('valor');
                            if (precio == "") {
                                alert('el campo esta vacio');
                            } else {
                                $('input[type="number"]').val('');
                                console.log(precio);
                                console.log(id);
                                console.log(cedula);
                                console.log(valor_total);
                                $.ajax({
                                        type: "POST",
                                        url: "/abonos/",
                                        data: {
                                            precio: precio,
                                            id: id,
                                            cedula: cedula,
                                            valor_total: valor_total,
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
                                        alert(response.mensaje);

                                    });

                            }

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