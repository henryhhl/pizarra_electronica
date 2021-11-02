
const { io } = require( "../server" );

const { usuarioConectado, usuarioDesconectado, getUsuarios, guardarMensaje, getSala, guardarSala, iniciarSala, finalizarSala, getTableSala, guardarTable, actualizarTable } = require("../controller/socketController");
const { verificarJWT } = require("../helpers/jwt");

io.on( 'connection', async ( client ) => {

    const [ valido, uid ] = verificarJWT( client.handshake.query['x-token'] );

    if ( !valido ) {

        console.log( "Socket no identificado" );
        return client.disconnect();
    }

    const usuarioCon = await usuarioConectado( uid );
    
    // unir al usuario a una sala de socket
    client.join( uid );

    // io.to('sala-grupo').emit('');

    // Escuchar cuando el cliente manda mensaje
    client.on( 'mensaje-personal', async ( payload ) => {
        const mensaje = await guardarMensaje( payload );
        io.to( payload.para ).emit( 'mensaje-personal', mensaje );
        io.to( payload.de ).emit( 'mensaje-personal', mensaje );
    } );


    client.on( 'store-sala', async ( payload ) => {
        const sala = await guardarSala( payload );
        console.log(sala)
        io.emit( 'sala-actualizada', sala );
    } );

    client.on( 'iniciar-sala', async ( payload ) => {
        await iniciarSala( payload.uid );
        io.emit( 'sala-actualizada', payload );
    } );

    client.on( 'ingresar-sala', async ( payload ) => {
        const array_table = await getTableSala( payload.uid );
        io.to( uid ).emit( 'ingresar-sala', array_table );
    } );

    client.on( 'agregar-table', async ( payload ) => {
        const table = await guardarTable( payload );
        io.emit( 'table-actualizado', table );
    } );

    client.on( 'actualizar-table', async ( payload ) => {
        const table = await actualizarTable( payload );
        io.emit( 'table-actualizado', table );
    } );


    client.on( 'finalizar-sala', async ( payload ) => {
        await finalizarSala( payload.uid );
        io.emit( 'sala-actualizada', payload );
    } );

    client.on( 'getSala', async ( payload ) => {
        io.to( payload ).emit( 'getSala', await getSala(payload) );
    } );

    console.log( "Cliente conectado" );

    io.emit( 'getUsuario', await getUsuarios() );

    // io.to( uid ).emit( 'getSala', await getSala(uid) );

    client.on( 'disconnect', async () => {
        console.log( "Cliente desconectado" );
        const usuarioDescon = await usuarioDesconectado( uid );
        io.emit( 'getUsuario', await getUsuarios() );
    } );

} );