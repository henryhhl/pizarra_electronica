
// path: /api/auth

const { Router } = require( "express" );

const { getUsuario, showUsuario } = require("../controller/usuarioController");

const router = Router();

// path: /api/usuario
// @access Public

router.get( "/index", getUsuario );

router.get( "/show/:idusuario", showUsuario );

module.exports = router;
