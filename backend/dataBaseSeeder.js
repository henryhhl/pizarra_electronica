
require( "dotenv" ).config();

const usuarioData = require( "./data/UsuarioData" );
const Usuario = require( "./models/Usuario" );

const Mensaje = require( "./models/Mensaje" );

const Table = require( "./models/Tables" );
const Sala = require( "./models/Sala" );
const SalaUsuario = require( "./models/SalaUsuario" );

const connectDB = require( "./config/db" );
connectDB();

const importData = async () => {
    try {
        await SalaUsuario.deleteMany( {} );
        await Table.deleteMany( {} );
        await Sala.deleteMany( {} );

        await Mensaje.deleteMany( {} );

        await Usuario.deleteMany( {} );
        await Usuario.insertMany( usuarioData );

        console.log( "Data import Success" );
        process.exit();
    } catch (error) {
        console.error( "Error with data import" );
        process.exit(1);
    }
};

importData();
