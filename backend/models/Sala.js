
const mongoose = require( "mongoose" );

const SalaSchema = new mongoose.Schema( {

    nombre: {
        type: String,
        required: true,
    },
    codigo: {
        type: String,
        required: true,
    },
    nota: {
        type: String,
        required: false,
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
