const userDao   = require("../daos/userDAO");
const {status,errorMessage,successMessage}    = require("../helpers/status"); 
const bcrypt    = require("bcrypt");  

const login = async (req,res) => {
    const {correo,clave} = req.body;
    console.log(`Correo: ${correo}`);
    console.log(`Clave: ${clave}`);
    try{
        const valuesRfcCorreo = [correo, ""];
        const dbResponse = await userDao.obtenerDatosConCorreoRfc(valuesRfcCorreo);
        console.log(`Response Db: ${dbResponse}`);
        if(!dbResponse){
            errorMessage.mensaje = "El email no existe";
            return res.send(errorMessage);
        }
        const match = await bcrypt.compare(clave, dbResponse.clave);
        if(match){
            req.session.id_usuario = dbResponse.id;
            req.session.ingreso    = true;
            return res.send(successMessage);
        }else{
            errorMessage.mensaje = "La clave no es correcta";
            return res.send(errorMessage);
        }
    }catch(error){
        console.log("[userController][login] Error "+error);
        errorMessage.mensaje = error;
        res.send(errorMessage);

    }
};

const crearUsuario = async (req,res) => {
    const {nombre, correo, rfc, clave} = req.body;
    /*console.log(`Datos: ${nombre}`);
    console.log(`Correo: ${correo}`);
    console.log(`Rfc: ${rfc}`);
    console.log(`Clave: ${clave}`);*/
    try {
        const valuesRfcCorreo = [correo, rfc];
        const dbResponse = await userDao.obtenerDatosConCorreoRfc(valuesRfcCorreo);
        if(dbResponse){
            if(dbResponse.rfc == rfc){
                errorMessage.mensaje = "Ya hay un usuario con ese RFC";
            }else if(dbResponse.correo == correo){
                errorMessage.mensaje = "Ya hay un usuario con ese correo";
            }else{
                errorMessage.mensaje = "Algo anda mal";
            }
            return res.status(status.error).send(errorMessage);
        }
        
        const hash = await bcrypt.hash(clave, 15);
        
        const values    = [nombre, correo, rfc, hash];
        const response = await userDao.darDeAltaUsuario(values);
        if(response){
            //successMessage.data = response;
            return res.send(successMessage);
        }else{
            errorMessage.mensaje = "Ocurrio un error en base de datos";
            return res.status(status.error).send(errorMessage);
        }
    } catch (error) {
        return res.status(status.error).send(errorMessage);
    }
};

module.exports = {
    crearUsuario, login
};