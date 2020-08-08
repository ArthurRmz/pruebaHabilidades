$( document ).ready(function() {
    //$("#btn-registrarse").attr("disabled", true);
    noEnviar();
    validarFormulario();
});

function noEnviar(){
    $("#formulario-modificar-datos").submit(function(e){
        e.preventDefault();
    });
}

function validarFormulario(){
    let form = $( "#formulario-modificar-datos" );
    form.validate();
    $( "#btn-actualizar" ).click(function() {
        //alert( "Valid: " + form.valid() );
        if(form.valid()){
            let direccion = $("#direccion").val();
            let telefono = $("#telefono").val();
            let website = $("#website").val();
            let datos = {
                direccion: direccion,
                telefono: telefono,
                website: website
            };
            actualizarDatos(datos);
        }
    });
}

function actualizarDatos(datos){
    fetch("/user", {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if(response.status === "success"){
            $("#modal-encabezado").text("Información");
            $("#modal-texto").text("Datos actualizados de forma correcta");
            $("#myModal").modal("toggle");
        }else{
            $("#modal-encabezado").text("Error");
            $("#modal-texto").text(response.mensaje);
            $("#myModal").modal("toggle");

        }
    })
    .catch(error => console.error('Error:', error));
}