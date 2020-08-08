const express           = require("express");
const router            = express.Router();
const {auth}            = require("../helpers/sessionHelper");
const daoUser           = require("../daos/userDAO");

router.get("/", (req, res) => res.render('pages/login'));

router.get("/registro", (req, res) => res.render('pages/registro'));

router.get("/home", auth,async (req, res) => {
    let dbResponse = null;
    let results = null;
    try{
        const idUser = req.session.id_usuario;
        dbResponse = await daoUser.obtenerDatosPorId(idUser);
        //console.log(dbResponse);
        results = { 'results': (dbResponse) ? dbResponse : null};
    }catch(error ){
        console.log(`[paginasRoutes][/home] Error ${error}`);
    }
    return res.render('pages/pagina-inicio', results);
});

router.get("/cambiar-clave", auth,(req, res) => {
    return res.render('pages/pagina-cambiar-clave');
});

router.get("/modificar-datos", auth,async (req, res) => {
    let dbResponse = null;
    let results = null;
    try{
        const idUser = req.session.id_usuario;
        dbResponse = await daoUser.obtenerDatosPorId(idUser);
        //console.log(dbResponse);
        results = { 'results': (dbResponse) ? dbResponse : null};
    }catch(error ){
        console.log(`[paginasRoutes][/modificar-datos] Error ${error}`);
    }
    return res.render('pages/pagina-modificar-datos',results);
});

router.get("/palindromo", auth,(req, res) => {
    return res.render('pages/pagina-algoritmo-palidromo');
});

router.get('/logout', function (req, res) {
    req.session.destroy();
    return res.render('pages/cerrar');
});

router.get("*", (req, res) => res.render('pages/login'));


module.exports = router;