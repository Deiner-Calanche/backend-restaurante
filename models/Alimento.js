const { Schema, model } = require("mongoose");

const Alimentochema = Schema({
    codigo: { type: String, required: true, unique: true },
    nombres: { type: String, required: true },
    categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
    proveedor: { type: Schema.Types.ObjectId, ref: "Proveedor", required: true },
    unidadMedida: {
        type: String,
        required: true,
        enum: ["gramos", "litros", "mililitros", "unidades"],
    },
    estado: { type: String, required: true, enum: ["Activo", "Inactivo"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Alimento", Alimentochema);
