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
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    jQuery.validator.messages.required = 'Esta campo es obligatorio.';
    jQuery.validator.messages.email = 'La direcci&oacute;n de correo es incorrecta.';
    jQuery.validator.messages.equalTo = 'Las claves no coinciden.';
    let form = $( "#formulario-login" );
    form.validate();
    $( "#btn-registrarse" ).click(function() {
    alert( "Valid: " + form.valid() );
    });
}