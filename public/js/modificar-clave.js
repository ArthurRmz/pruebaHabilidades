$( document ).ready(function() {
    //$("#btn-registrarse").attr("disabled", true);
    noEnviar();
    validarFormulario();
});

function noEnviar(){
    $("#formulario-modificar-clave").submit(function(e){
        e.preventDefault();
    });
}

function validarFormulario(){
    let form = $( "#formulario-modificar-clave" );
    form.validate();
    $( "#btn-actualizar-clave" ).click(function() {
        if(form.valid()){
            let claveActual = $("#claveActual").val();
            let claveNueva = $("#claveNueva").val();
            let datos = {
                claveActual: claveActual,
                claveNueva: claveNueva,
            };
            actualizarDatos(datos);
        }
    });
}

function actualizarDatos(datos){
    $("#modalCargando").modal("toggle");
    fetch("/user/clave", {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        //console.log(response);
        if(response.status === "success"){
            $("#modal-encabezado").text("Información");
            $("#modal-texto").text("Datos actualizados de forma correcta");
            $("#myModal").modal("toggle");
            limpiarDatos();
        }else{
            $("#modal-encabezado").text("Error");
            $("#modal-texto").text(response.mensaje);
            $("#myModal").modal("toggle");
        }
    })
    .catch(error => console.error('Error:', error))
    .finally(()=>{
        $("#modalCargando").modal("toggle");
    });
}

function limpiarDatos(){
    $("#claveActual").val("");
    $("#claveNueva").val("");
    $("#claveNueva1").val("");
}