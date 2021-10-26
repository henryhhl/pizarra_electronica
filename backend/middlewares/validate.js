
const { response } = require( "express" );
const { validationResult } = require("express-validator");

const validate = ( request, resp = response, next ) => {

    const errors = validationResult( request );
    
    if ( !errors.isEmpty() ) {
        return resp.json( {
            response: 0,
            message: "Hubo conflictos al crear usuario",
            errors: errors.mapped(),
        } );
    };
    next();
};

module.exports = {
    validate
};
