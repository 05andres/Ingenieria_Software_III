$(document).ready(function() {

    $.ajax({
            type: "GET",
            url: "/lista_alertas",
            dataType: 'json',
            contentType: 'application/json',

        })
        .done(function(response) {
            var json = JSON.parse(response)
            console.log(json);
            var fecha = moment().format("YYYY-MM-DD");
            console.log(fecha);
            var html;
            var html2;
            var html3;

            $.each(json, function(index, element) {
                var fecha2 = moment(element.fields.Fecha_max_pago);
                var dias = (fecha2.diff(fecha, 'days'));
                console.log(dias);
                if (dias === 0) {
                    html = '<div id=abonar1 <li><strong>factura:</strong><strong>' + element.pk + '</strong> - <em><strong>cliente:</strong> ' + element.fields.cliente + '</em> - <span><strong>valor restante:</strong> ' + element.fields.valor + '</span></li>';
                    html += '- <em><strong>alerta amarilla</strong></div>'
                    $('body').append(html);
                }
                if (dias < 0) {
                    html2 = '<div id=abonar2 data-id="' + element.fields.cliente + '" <li><strong>factura:</strong><strong>' + element.pk + '</strong> - <em><strong>cliente:</strong> ' + element.fields.cliente + '</em> - <span><strong>valor restante:</strong> ' + element.fields.valor + '</span></li>';
                    html2 += '- <em><strong>estado roja</strong>'
                    html2 += '<button>Bloquear</button></div>';
                    $('body').append(html2);
                }
                if (dias > 0 && element.fields.valor != 0) {
                    html3 = '<div id=abonar3 data-id="' + element.fields.cliente + '" <li><strong>factura:</strong><strong>' + element.pk + '</strong> - <em><strong>cliente:</strong> ' + element.fields.cliente + '</em> - <span><strong>valor restante:</strong> ' + element.fields.valor + '</span></li>';
                    html3 += '- <em><strong>estado normal</strong></div>'
                    $('body').append(html3);
                }

            });
            $('body').on('click', '#abonar2 button', function(event) {
                event.preventDefault();
                var indentificacion = +$(this).closest('#abonar2').data('id');
                console.log(indentificacion);
                var csrftoken = getCookie('csrftoken');
                $.ajax({
                        type: "POST",
                        url: "/bloqueo/",
                        data: {
                            id: indentificacion,
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
            });

        });
});


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