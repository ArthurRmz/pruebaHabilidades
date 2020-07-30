const userDao   = require("../daos/userDAO");
//const token     = require("../helpers/tokenActions")
//const {status,errorMessage,successMessage}    = require("../helpers/status");   

const login = async (req,res) => {
    const {email,clave} = req.body;
    try{
        const dbResponse = await userDao.obtenerDatosConEmail(email);
        if(!dbResponse){
            errorMessage.mensaje = "El email no existe";
            return res.status(status.error).send(errorMessage);
        }
        const match = await bcrypt.compare(clave, dbResponse.clave);
        if(match){
            const tokenGenerado = token.generarToken(dbResponse);
            successMessage.data = tokenGenerado;
            return res.status(status.success).send(successMessage);
        }else{
            errorMessage.mensaje = "La clave no es correcta";
            return res.status(status.error).send(errorMessage);
        }
    }catch(error){
        console.log("[userController][login] Error "+error);
        errorMessage.mensaje = error;
        res.status(status.error).send(errorMessage);

    }
};

const paginaLogin = async (req,res) => {
    
};

const crearUsuario = async (req,res) => {
    const {nombre, correo, rfc, clave} = req.body;
    try {
        
    } catch (error) {
        
    }
};

module.exports = {
    crearUsuario, login
};