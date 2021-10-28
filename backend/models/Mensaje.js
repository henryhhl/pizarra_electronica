
const mongoose = require( "mongoose" );

const MensajeSchema = new mongoose.Schema( {

    de: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    para: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        required: true,
    },
    mensaje: {
        type: String,
        required: true,
    },

}, {
    timestamps: true,
} );

MensajeSchema.method( "toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
} );

const Mensaje = mongoose.model( "messages", MensajeSchema );

module.exports = Mensaje;
