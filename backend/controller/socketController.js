
const Usuario = require( "../models/Usuario" );
const Mensaje = require( "../models/Mensaje" );

const Sala = require( "../models/Sala" );
const Table = require( "../models/Tables" );

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

const guardarMensaje = async ( payload ) => {

    try {
        const mensaje = new Mensaje( payload );
        await mensaje.save();

        return mensaje;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const guardarSala = async ( payload ) => {
    try {

        const user = await Usuario.findById( payload.uid );

        const sala = new Sala( { nombre: payload.nombreSala, fkidusers: payload.uid, usuario: user.usuario } );
        await sala.save();

        return sala;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const iniciarSala = async ( uid ) => {

    const sala = await Sala.findById( uid );
    sala.iniciar = true;
    await sala.save();

    return sala;
};

const finalizarSala = async ( uid ) => {

    const sala = await Sala.findById( uid );
    sala.iniciar = false;
    await sala.save();

    return sala;
};

const getSala = async ( uid ) => {

    const user = await Usuario.findById( uid );

    const salasDelUsuario = await Sala.aggregate( [
        {
            $lookup: {
                from: 'users',
                localField: 'fkidusers',
                foreignField: '_id',
                as: "user",
            },
        },
        { $unwind: "$user", },
        { $match: { usuario: user.usuario }, },
        {
            $project: {
                "_id" : 0,
                "nombre" : 1,
                "uid": "$_id",
                "user": 1,
                "usuario": 1,
                "fkidusers": 1,
                "iniciar": 1,
            },
        },
    ] )
    .sort( { createdAt: 'desc' } );

    let salas = await Sala.aggregate( [
        {
            $lookup: {
                from: 'users',
                localField: 'fkidusers',
                foreignField: '_id',
                as: "user",
            },
        },
        { $unwind: "$user", },
        { $match: { usuario: { $ne: user.usuario } }, },
        {
            $project: {
                "_id" : 0,
                "nombre" : 1,
                "uid": "$_id",
                "user": 1,
                "usuario": 1,
                "fkidusers": 1,
                "iniciar": 1,
            },
        },
    ] )
    .sort( { createdAt: 'asc' } );

    salas = salasDelUsuario.concat(salas);

    return salas;
};

const getTableSala = async ( uid ) => {

    const tables = await Table.find( { fkidsalas: uid, } );
    return tables;
};

const guardarTable = async (payload) => {
    try {

        const table = new Table( { 
            nombre: "Title", subtitle: "", descripcion: "",
            fkidsalas: payload.uid, 
            left: payload.left, top: payload.top, 
            width: 150, height: 180, background: payload.background,
            type: payload.type,
        } );
        await table.save();
        return table;

    } catch (error) {
        console.log(error);
        return null;
    }
};

const actualizarTable = async (payload) => {
    const table = await Table.findById( payload.uid );
    table.nombre = payload.nombre;
    table.subtitle = payload.subtitle;
    table.descripcion = payload.descripcion;

    table.left = payload.left ? payload.left : table.left;
    table.top = payload.top ? payload.top : table.top;
    table.width = payload.width ? payload.width : table.width;
    table.height = payload.height ? payload.height : table.height;

    await table.save();

    return table;
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    getUsuarios,
    guardarMensaje,
    getSala,
    guardarSala,
    iniciarSala,
    finalizarSala,
    getTableSala,
    guardarTable,
    actualizarTable,
};
