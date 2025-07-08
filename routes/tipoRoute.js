const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
} = require("../controllers/tipoController");

const { verificarToken, verificarRolAdmin } = require("../middlewares/authMiddleware");

// Middleware de validación local
const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// 📄 Obtener todos los Tipos (público o autenticado)
router.get("/", getTipos);

// 🔍 Obtener Tipo por ID
router.get("/:id", getTipoById);

// ➕ Crear nuevo Tipo (requiere autenticación)
router.post(
  "/",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  createTipo
);

// 🔄 Actualizar Tipo por ID (requiere autenticación)
router.put(
  "/:id",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  updateTipo
);

// ❌ Eliminar Tipo por ID (solo admin)
router.delete("/:id", verificarToken, verificarRolAdmin, deleteTipo);

module.exports = router;
