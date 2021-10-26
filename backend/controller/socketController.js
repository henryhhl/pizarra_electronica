
const Usuario = require( "../models/Usuario" );

const usuarioConectado = async ( uid ) => {

    const user = await Usuario.findById( uid );
    user.online = true;
    await user.save();

    return user;
};

const usuarioDesconectado = async ( uid ) => {

    const user = await Usuario.findById( uid );
    user.online = false;
    await user.save();

    return user;
};

const getUsuarios = async ( ) => {

    const users = await Usuario.find( ).sort( '-online' );

    return users;
};

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
};
