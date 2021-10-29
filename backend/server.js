
// npm i --save-dev nodemon concurrently
// rm -rf .git

require( "dotenv" ).config();

const express = require( "express" );
const path = require( "path" );
const cors = require( "cors" );

const connectDB = require( "./config/db" );
connectDB();

const app = express();

const server = require( "http" ).createServer( app );
module.exports.io = require( "socket.io" )( server );

require( "./sockets/socket" );


const publicPath = path.resolve( __dirname, "./public" );
app.use( express.static( publicPath ) );

// cors
app.use( cors() );

// Lectura y parseo del Body
app.use( express.json() );

// Rutas
app.use( "/api/auth", require( "./routes/authRoutes" ) );
app.use( "/api/usuario", require( "./routes/usuarioRoutes" ) );
app.use( "/api/mensaje", require( "./routes/mensajeRoutes" ) );
app.use( "/api/sala", require( "./routes/salaRoutes" ) );

const PORT = process.env.PORT || 5000;

server.listen( PORT, ( error ) => {
    if ( error ) throw new Error(error);
    console.log( `Server running on port ${PORT}` )
} );
