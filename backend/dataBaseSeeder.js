
require( "dotenv" ).config();

const usuarioData = require( "./data/UsuarioData" );
const Usuario = require( "./models/Usuario" );

const connectDB = require( "./config/db" );
connectDB();

const importData = async () => {
    try {
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
