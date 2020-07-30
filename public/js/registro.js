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
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid"
    });
    jQuery.validator.messages.required = 'Esta campo es obligatorio.';
    jQuery.validator.messages.email = 'La direcci&oacute;n de correo es incorrecta.';
    jQuery.validator.messages.equalTo = 'Las claves no coinciden.';
    jQuery.validator.addMethod("RFC", function (value, element) {
        if (value !== '') {
            var patt = new RegExp("^[A-Z,Ñ,&]{3,4}[0-9]{2}[0-1][0-9][0-3][0-9][A-Z,0-9]?[A-Z,0-9]?[0-9,A-Z]?$");
            return patt.test(value);
        } else {
            return false;
        }
    }, "Ingrese un RFC valido");
    let form = $( "#formulario" );
    form.validate();
    $( "#btn-registrarse" ).click(function() {
    alert( "Valid: " + form.valid() );
    });
}