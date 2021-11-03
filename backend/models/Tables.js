
const mongoose = require( "mongoose" );

const TablesSchema = new mongoose.Schema( {

    nombre: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    background: {
        type: String,
    },
    type: {
        type: String,
    },
    fkidsalas: {
        type: mongoose.Types.ObjectId,
        ref: "salas",
        required: true,
    },
    top: {
        type: Number,
        required: true,
    },
    left: {
        type: Number,
        required: true,
    },
    width: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
} );

TablesSchema.method( "toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
} );

const Tables = mongoose.model( "tables", TablesSchema );

module.exports = Tables;
