
const { io } = require( "../server" );

const { usuarioConectado, usuarioDesconectado, getUsuarios } = require("../controller/socketController");
const { verificarJWT } = require("../helpers/jwt");

io.on( 'connection', async ( client ) => {

    const [ valido, uid ] = verificarJWT( client.handshake.query['x-token'] );

    if ( !valido ) {

        console.log( "Socket no identificado" );
        return client.disconnect();
    }

    const usuarioCon = await usuarioConectado( uid );

    console.log( "Cliente conectado" );

    io.emit( 'getUsuario', await getUsuarios() );

    client.on( 'disconnect', async () => {
        console.log( "Cliente desconectado" );
        const usuarioDescon = await usuarioDesconectado( uid );
        io.emit( 'getUsuario', await getUsuarios() );
    } );

} );