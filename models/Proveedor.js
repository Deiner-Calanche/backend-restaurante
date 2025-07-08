const { Schema, model } = require("mongoose");

const Proveedorchema = Schema({
    nombres: { type: String, required: true, unique: true },
    tipo: { type: String, required: true, enum: ["Interno", "Externo"] },
    telefono: { type: String, required: true, unique: true },
    direccion: { type: String },
    estado: { type: String, required: true, enum: ["Activo", "Inactivo"] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Proveedor", Proveedorchema);
