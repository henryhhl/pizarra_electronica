
// path: /api/auth

const { Router } = require( "express" );
const { check } = require("express-validator");

const { registerUsuario, login, renewToken } = require( "../controller/authController" );

const { validate } = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validateJWT");

const router = Router();

router.post( "/register", [
    check( "nombre", "Campo nombre es obligtorio" ).not().isEmpty(),
    check( "apellido", "Campo apellido es obligtorio" ).not().isEmpty(),
    check( "usuario", "Campo usuario es obligtorio" ).not().isEmpty(),
    check( "password", "Campo contaseña es obligtorio" ).not().isEmpty(),
    check( "password", "Campo contaseña permite minimo 4 caracteres" ).not().isEmpty().isLength( { min: 4, } ),
    check( "email", "Campo correo es obligtorio" ).isEmail(),
    validate,
], registerUsuario );

router.post( "/login", [
    check( "usuario", "Campo usuario es obligtorio" ).not().isEmpty(),
    check( "password", "Campo contaseña es obligtorio" ).not().isEmpty(),
    validate,
], login );

router.get( "/newToken", validateJWT, renewToken );

module.exports = router;
