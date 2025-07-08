const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { registrarUsuario, loginUsuario, listarUsuarios, updateUsuario, deleteUsuario } = require("../controllers/usuarioController");

// Middleware para validar campos
const validarCampos = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Registrar nuevo usuario
router.post(
  "/",
  [
    body("nombres", "Nombre obligatorio").notEmpty(),
    body("email", "Email inválido").isEmail(),
    body("password", "Contraseña mínimo 7 caracteres").isLength({ min: 7 }),
    validarCampos,
  ],
  registrarUsuario
);

// Login
router.post(
  "/login",
  [
    body("email", "Email inválido").isEmail(),
    body("password", "Contraseña requerida").notEmpty(),
    validarCampos,
  ],
  loginUsuario
);


// 🔐 GET /api/usuarios (solo para admin)
router.get("/", listarUsuarios)


// Obtener usuarios
router.get("/", listarUsuarios);

// Actualizar usuario
router.put("/:id", updateUsuario);

// Eliminar usuario
router.delete("/:id", deleteUsuario);


module.exports = router;
