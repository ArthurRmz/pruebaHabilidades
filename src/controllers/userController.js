const userDao   = require("../daos/userDAO");
const {status,errorMessage,successMessage}    = require("../helpers/status"); 
const bcrypt    = require("bcrypt");  

const login = async (req,res) => {
    const {correo,clave} = req.body;
    /*console.log(`Correo: ${correo}`);
    console.log(`Clave: ${clave}`);*/
    try{
        const valuesRfcCorreo = [correo, ""];
        const dbResponse = await userDao.obtenerDatosConCorreoRfc(valuesRfcCorreo);
        //console.log(`Response Db: ${dbResponse}`);
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
        return res.send(errorMessage);

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

const actualizarDatos = async (req,res) => {
    const {direccion, telefono, website} = req.body;
    //const idUser = req.session.id_usuario;
    //console.log(`Id usuario: ${idUser}`);
    const idUser = req.session.id_usuario;
    const values = [direccion, telefono, website, idUser];
    try {
        const dbResponse = await userDao.actualizarUsuario(values);
        if(dbResponse){
            return res.send(successMessage);
        }else{
            errorMessage.mensaje = "Ocurrio un error en base de datos";
            return res.send(errorMessage);
        }
    } catch (error) {
        console.log("[userController][actualizarDatos] Error "+error);
        errorMessage.mensaje = error;
        return res.send(errorMessage);

    }
};

const actualizarClave = async (req,res) => {
    const {claveActual, claveNueva} = req.body;
    /*console.log(`Clave Actual: ${claveActual}`);
    console.log(`Clave Nueva: ${claveNueva}`);*/
    const idUser = req.session.id_usuario;
    try {
        const dbResponse = await userDao.obtenerDatosPorId(idUser);
        if(!dbResponse){
            errorMessage.mensaje = "Ocurrio un error en base de datos";
            return res.send(errorMessage);
        }
        const match = await bcrypt.compare(claveActual, dbResponse.clave);
        if(match){
            //TODO Actualizar
            const hash = await bcrypt.hash(claveNueva, 15);
            const values = [hash,idUser];
            const bdResponse = await userDao.actualizarClaveUsuario(values);
            if(bdResponse){
                return res.send(successMessage);
            }else{
                errorMessage.mensaje = "Ocurrio un error en base de datos";
                return res.send(errorMessage);
            }
        }else{
            errorMessage.mensaje = "La clave no es correcta";
            return res.send(errorMessage);
        }
    } catch (error) {
        console.log("[userController][actualizarClave] Error "+error);
        errorMessage.mensaje = error;
        return res.send(errorMessage);
    }
};

module.exports = {
    crearUsuario, login, actualizarDatos, actualizarClave
};