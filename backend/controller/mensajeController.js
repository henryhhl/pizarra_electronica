
const { response } = require( "express" );

const Mensaje = require( "../models/Mensaje" );
const Usuario = require( "../models/Usuario" );

const showMensaje = async ( request, resp = response ) => {

    try {

        const miId = request.uid;
        const idusersDe = request.params.de;

        const existUsuario = await Usuario.findById( idusersDe );
        if ( !existUsuario ) {
            return resp.json( {
                response: -1,
                message: "Usuario no existente",
            } );
        }

        const messages = await Mensaje.find( {
            $or: [
                { de: miId, para: idusersDe },
                { de: idusersDe, para: miId },
            ]
        } ) . sort( { createdAt: 'asc' } );

        return resp.json( {
            response: 1,
            message: "Servicio realizado exitosamente",
            messages: messages,
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
    showMensaje,
};
