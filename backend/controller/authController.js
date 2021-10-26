
const { response } = require( "express" );
const bcrypt = require( "bcryptjs" );

const Usuario = require( "../models/Usuario" );

const { generarJWT } = require("../helpers/jwt");

const registerUsuario = async ( request, resp = response ) => {

    try {

        const { usuario, password } = request.body;
        const existUsuario = await Usuario.findOne( { usuario: usuario } );

        if ( existUsuario ) {
            return resp.json( {
                response: -1,
                message: "Usuario ya está registrado",
            } );
        }

        const users = new Usuario( request.body );

        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync( password, salt );

        await users.save();

        const token = await generarJWT( users.id );

        return resp.json( {
            response: 1,
            message: "Usuario creado exitosamente",
            usuario: users,
            token: token,
        } );

    } catch (error) {
        console.error( error );
        return resp.json( {
            response: -4,
            message: "Error de servidor",
        } );
    }
};

const login = async ( request, resp = response ) => {
    try {

        const { usuario, password } = request.body;
        const user = await Usuario.findOne( { usuario: usuario } );

        if ( !user ) {
            return resp.json( {
                response: -1,
                message: "Usuario no existente",
            } );
        }

        const validarPassword = bcrypt.compareSync( password, user.password );

        if ( !validarPassword ) {
            return resp.json( {
                response: -1,
                message: "Contraseña incorrecto",
            } );
        }

        const token = await generarJWT( user.id );

        return resp.json( {
            response: 1,
            message: "Usuario autenticado exitosamente",
            usuario: user,
            token: token,
        } );

    } catch (error) {
        console.error( error );
        return resp.json( {
            response: -4,
            message: "Error de servidor",
        } );
    }
};

const renewToken = async ( request, resp = response ) => {

    const uid = request.uid;
    const token = await generarJWT( uid );

    const user = await Usuario.findById( uid );

    return resp.json( {
        response: 1,
        message: "Token generado exitosamente",
        usuario: user,
        token: token,
    } );
};

module.exports = {
    registerUsuario,
    login,
    renewToken,
};
