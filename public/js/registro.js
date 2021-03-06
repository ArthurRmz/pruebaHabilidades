$( document ).ready(function() {
    //$("#btn-registrarse").attr("disabled", true);
    noEnviar();
    validarFormulario();
});


function noEnviar(){
    $("#formulario").submit(function(e){
        e.preventDefault();
    });
}

function validarFormulario(){
    let form = $( "#formulario" );
    form.validate();
    $( "#btn-registrarse" ).click(function() {
        //alert( "Valid: " + form.valid() );
        if(form.valid()){
            let nombre = $("#nombre").val();
            let correo = $("#correo").val();
            let rfc = $("#rfc").val();
            let clave1 = $("#clave1").val();
            let datos = {
                nombre: nombre,
                correo: correo,
                rfc: rfc,
                clave: clave1
            };
            guardarDatos(datos);
        }
    });
}

function guardarDatos(datos){
    $("#modalCargando").modal("toggle");
    fetch("/user", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        if(response.status === "success"){
            $("#modal-encabezado").text("Información");
            $("#modal-texto").text("El usuario se ingreso de forma correcta");
            $("#myModal").modal("toggle");
            setTimeout(function(){ window.location = "/"; }, 3000);
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