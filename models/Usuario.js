const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    nombres: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ["admin", "usuario"], default: "usuario" },
    estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuario", UsuarioSchema);
