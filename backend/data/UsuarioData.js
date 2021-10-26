
const bcrypt = require( "bcryptjs" );
const salt = bcrypt.genSaltSync();

const UsuarioSeeder = [
    {
        nombre: "Mauricio",
        apellido: "Baldivieso Santos",
        usuario: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync( "123456", salt ),
        online: false,
    },
];

module.exports = UsuarioSeeder;

