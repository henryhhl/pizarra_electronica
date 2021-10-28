
const mongoose = require( "mongoose" );

const SalaSchema = new mongoose.Schema( {

    nombre: {
        type: String,
        required: true,
    },
    fkidusers: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    usuario: {
        type: String,
        required: true,
    },
    iniciar: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    timestamps: true,
} );

SalaSchema.method( "toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
} );

const Sala = mongoose.model( "salas", SalaSchema );

module.exports = Sala;
