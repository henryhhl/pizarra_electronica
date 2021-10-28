
const { response } = require( "express" );
const bcrypt = require( "bcryptjs" );

const Usuario = require( "../models/Usuario" );
const Sala = require( "../models/Sala" );

const { generarJWT } = require("../helpers/jwt");
const { getSala } = require("./socketController");

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

        const user = new Usuario( request.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await generarJWT( user.id );
        const salas = await getSala( user.id );

        return resp.json( {
            response: 1,
            message: "Usuario creado exitosamente",
            usuario: user,
            array_sala: salas,
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
        const salas = await getSala( user.id );

        return resp.json( {
            response: 1,
            message: "Usuario autenticado exitosamente",
            usuario: user,
            token: token,
            array_sala: salas,
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

    if ( !user ) {
        return resp.json( {
            response: -1,
            message: "Usuario no existente",
        } );
    }

    const salas = await getSala( uid );

    return resp.json( {
        response: 1,
        message: "Token generado exitosamente",
        usuario: user,
        token: token,
        array_sala: salas,
    } );
};

module.exports = {
    registerUsuario,
    login,
    renewToken,
};
