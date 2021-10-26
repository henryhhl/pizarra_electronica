
const mongoose = require( "mongoose" );

const SalaUsuarioSchema = new mongoose.Schema( {

    fkidusers: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    fkidsalas: {
        type: mongoose.Types.ObjectId,
        ref: "salas",
        required: true,
    },
    rol: {
        type: Boolean,
        required: true,
        default: false,
    },

}, {
    timestamps: true,
} );

SalaUsuarioSchema.method( "toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
} );

const SalaUsuario = mongoose.model( "salausers", SalaUsuarioSchema );

module.exports = SalaUsuario;
