const { Schema, model } = require("mongoose");

const TematicaSchema = Schema({
    nombre: {
        type:String,
        required:true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        required:true,
        ref: "Categoria"
    },
    permisos: {
        type: [String],
        required: true,
      },

});

TematicaSchema.method( "toJSON", function(){
    const { __v, _id, ... object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model( "Tematica", TematicaSchema );