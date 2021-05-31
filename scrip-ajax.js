$("#datos").on("click", obtenerDatos);

function obtenerDatos() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        success: function (respuesta) {
            console.log("Datos enviados correctamente")
        },
        error: function () {
            console.log("No se ha podido obtener la informacion")
        }
    });
}