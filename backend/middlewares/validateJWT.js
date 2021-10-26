
const { response } = require( "express" );
const jwt = require( "jsonwebtoken" );

const validateJWT = ( request, resp = response, next ) => {

    const token = request.header( "x-token" );
    if ( !token ) {
        return resp.json( {
            response: 0,
            message: "No existe Token en la peticion",
        } );
    };

    try {

        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        request.uid = uid;

        next();

    } catch (error) {
        console.error( error );
        return resp.json( {
            response: 0,
            message: "Token no valido",
        } );
    }
    
};

module.exports = {
    validateJWT
};
