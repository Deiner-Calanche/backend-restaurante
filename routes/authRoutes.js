const express = require("express");
const router = express.Router();
const {
  solicitarRecuperacion,
  restablecerContrasena,
  recordarUsuario
} = require("../controllers/authController");

// 📧 Enviar token de recuperación por correo
router.post("/recuperar", solicitarRecuperacion);

// 🔁 Restablecer contraseña usando token
router.post("/reset-password", restablecerContrasena);

router.post("/recordar-usuario", recordarUsuario);

module.exports = router;
