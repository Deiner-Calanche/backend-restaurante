const crypto = require("crypto");
const Usuario = require("../models/Usuario");
const sendRecoveryMail = require("../utils/sendMail");
const bcrypt = require("bcryptjs");

const recoveryTokens = {};

const solicitarRecuperacion = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Correo no registrado" });

    const token = crypto.randomBytes(20).toString("hex");
    const expires = Date.now() + 10 * 60 * 1000;

    recoveryTokens[email] = { token, expires };

    const link = `${process.env.CLIENT_URL}/reset-password/${token}`;
    const previewUrl = await sendRecoveryMail(email, link);

    res.json({
      msg: "📨 Correo de recuperación enviado",
      previewUrl,
      resetUrl: link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

const restablecerContrasena = async (req, res) => {
  const { token, nuevaPassword } = req.body;

  try {
    const email = Object.keys(recoveryTokens).find(
      (e) => recoveryTokens[e].token === token
    );

    if (
      !email ||
      !recoveryTokens[email] ||
      recoveryTokens[email].expires < Date.now()
    ) {
      return res.status(400).json({ msg: "Token inválido o expirado" });
    }

    const hashed = await bcrypt.hash(nuevaPassword, 10);
    await Usuario.findOneAndUpdate({ email }, { password: hashed });

    delete recoveryTokens[email];

    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cambiar la contraseña" });
  }
};


const recordarUsuario = async (req, res) => {
  const { nombres } = req.body;

  try {
    const user = await Usuario.findOne({
      nombres: { $regex: new RegExp(nombres, "i") }
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json({ email: user.email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

// 🔥 Aquí está el export correcto
module.exports = {
  solicitarRecuperacion,
  restablecerContrasena,
  recordarUsuario,
};
