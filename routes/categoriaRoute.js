const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getCategoria,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require("../controllers/categoriaController");

const { verificarToken, verificarRolAdmin } = require("../middlewares/authMiddleware");

// Middleware de validación local
const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// 📄 Obtener todas las categorías
router.get("/", getCategoria);

// 🔍 Obtener categoría por ID
router.get("/:id", getCategoriaById);

// ➕ Crear categoría (solo autenticado)
router.post(
  "/",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  createCategoria
);

// 🔄 Actualizar categoría (solo autenticado)
router.put(
  "/:id",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  updateCategoria
);

// ❌ Eliminar categoría (solo admin)
router.delete("/:id", verificarToken, verificarRolAdmin, deleteCategoria);

module.exports = router;
