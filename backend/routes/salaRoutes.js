
// path: /api/sala

const { Router } = require( "express" );

const { showSala } = require("../controller/salaController");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.get( "/show/:uidsala", validateJWT, showSala );

module.exports = router;
