
// path: /api/mensaje

const { Router } = require( "express" );

const { showMensaje } = require("../controller/mensajeController");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get( "/show/:de", validateJWT, showMensaje );

module.exports = router;
