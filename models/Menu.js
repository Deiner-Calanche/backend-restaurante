const { Schema, model } = require("mongoose");

const Menuchema = Schema({
  codigo: { type: String, required: true, unique: true },
  fecha: { type: String, required: true },
  tipo: { type: Schema.Types.ObjectId, ref: "Tipo", required: true },
  alimentos: [{ type: Schema.Types.ObjectId, ref: "Alimento", required: true }],
  imagen: { type: String },
  observaciones: { type: String },
  estado: { type: String, required: true, enum: ["Activo", "Inactivo"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model("Menu", Menuchema);
