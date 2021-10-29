

const { response } = require( "express" );

const Sala = require( "../models/Sala" );

const showSala = async ( request, resp = response ) => {

    try {

        const uidsala = request.params.uidsala;
        const sala = await Sala.findById( uidsala );

        return resp.json( {
            response: 1,
            message: "Servicio realizado exitosamente",
            sala: sala,
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
    showSala,
};


