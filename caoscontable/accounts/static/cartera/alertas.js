$(document).ready(function() {

    $.ajax({
            type: "GET",
            url: "/lista_alertas",
            dataType: 'json',
            contentType: 'application/json',

        })
        .done(function(response) {
            var json = JSON.parse(response)
            console.log(json)
            $.each(json, function(index, element) {
                console.log(element.fields.Fecha_compra)
                var fecha1 = moment(element.fields.Fecha_compra);
                var fecha2 = moment(element.fields.Fecha_max_pago);
                console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');

            })

        });
});