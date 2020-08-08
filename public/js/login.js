$( document ).ready(function() {
    //$("#btn-registrarse").attr("disabled", true);
    noEnviar();
    validarFormulario();
});

function noEnviar(){
    $("#formulario-login").submit(function(e){
        e.preventDefault();
    });
}

function validarFormulario(){
    let form = $( "#formulario-login" );
    form.validate();
    $( "#btn-ingresar" ).click(function() {
        //alert( "Valid: " + form.valid() );
        if(form.valid()){
            let correo = $("#correo").val();
            let clave = $("#clave").val();
            let datos = {
                correo: correo,
                clave: clave
            };
            ingresar(datos);
        }
    });
}

function ingresar(datos){
    $("#modalCargando").modal("toggle");
    fetch("/user/login", {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(datos), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log(response);
        if(response.status === "success"){
            window.location = "/home";
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