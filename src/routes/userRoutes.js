const express           = require("express");
const router            = express.Router();
const userController    = require("../controllers/userController");

router.post("/", userController.crearUsuario);

router.put("/", userController.actualizarDatos)

router.put("/clave", userController.actualizarClave);

router.post("/login", userController.login);

module.exports = router;