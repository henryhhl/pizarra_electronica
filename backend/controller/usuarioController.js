
const { response } = require( "express" );

const Usuario = require( "../models/Usuario" );

const getUsuario = async ( request, resp = response ) => {

    try {

        const users = await Usuario.find( {} );

        return resp.json( {
            response: 1,
            message: "Servicio realizado exitosamente",
            usuario: users,
        } );

    } catch (error) {
        console.error( error );
        return resp.json( {
            response: -4,
            message: "Error de servidor",
        } );
    }
};

const showUsuario = async ( request, resp = response ) => {

    try {

        const user = await Usuario.findById( request.params.idusuario );

        return resp.json( {
            response: 1,
            message: "Servicio realizado exitosamente",
            usuario: user,
        } );

    } catch (error) {
        console.error( error );
        return resp.json( {
            response: -4,
            message: "Error de servidor",
        } );
    }
};

module.exports = {
    getUsuario,
    showUsuario,
};
