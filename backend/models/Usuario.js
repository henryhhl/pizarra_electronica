
const mongoose = require( "mongoose" );

const UsuarioSchema = new mongoose.Schema( {

    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required: true,
    },
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false,
        required: true,
    },

} );

UsuarioSchema.method( "toJSON", function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
} );

const Usuario = mongoose.model( "users", UsuarioSchema );

module.exports = Usuario;
