const { Schema, model } = require("mongoose");

const ContenidoSchema = Schema({
    titulo: {
        type:String,
        required:true
    },
    urlImagen: {
        type:String,
        required:true,
    },
    creador: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "Usuario"
    },
    tematica: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "Tematica"
    },

});

ContenidoSchema.method( "toJSON", function(){
    const { __v, _id, ... object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( "Contenido", ContenidoSchema );