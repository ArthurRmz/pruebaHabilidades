$( document ).ready(function() {
    //$("#btn-registrarse").attr("disabled", true);
    noEnviar();
    validarFormulario();
});

function noEnviar(){
    $("#formulario-palindromo").submit(function(e){
        e.preventDefault();
    });
}

function validarFormulario(){
    let form = $( "#formulario-palindromo" );
    form.validate();
    $( "#btn-verificar" ).click(function() {
        //alert( "Valid: " + form.valid() );
        if(form.valid()){
            let frase = $("#frase").val();
            let res = palabrasPalindromas(frase);
            if(res === ""){
                res = "No se encontraron palindromos";
            }
            $("#modal-encabezado").text("Información");
            $("#modal-texto").html(res);
            $("#myModal").modal("toggle");
        }
    });
}

function palabrasPalindromas(frase){
    let arrayPalabras = frase.split(" ");
    let textoFormateado = "";
    arrayPalabras.forEach(palabra => {
        if(esPalindromo(palabra)){
            textoFormateado += `${palabra} es un palindromo <br>`;
        }
        /*else{
            textoFormateado += `${palabra} no es un palindromo <br>`;
        }*/
    });
    return textoFormateado;
}

function esPalindromo(palabra){
    let estado = false; 
    if(convertirAMinusculas(palabra) === convertirAMinusculas(invertirPalabra(palabra))){
        estado = true;
    }
    return estado;
}

function convertirAMinusculas(palabra){
    return palabra.toLowerCase();
}

function invertirPalabra(palabra){
    let arrayPalabraInverda = palabra.split("").reverse();
    let palabraInvertida = "";
    arrayPalabraInverda.forEach(caracter => {
        palabraInvertida += caracter;
    });
    return palabraInvertida;
}
