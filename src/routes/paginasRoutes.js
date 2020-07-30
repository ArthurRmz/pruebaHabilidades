const express           = require("express");
const router            = express.Router();

router.get("/", (req, res) => res.render('pages/login'));
router.get("/registro", (req, res) => res.render('pages/registro'));
router.get("/home", (req, res) => res.render('pages/pagina-inicio'));
router.get("*", (req, res) => res.render('pages/login'));

module.exports = router;