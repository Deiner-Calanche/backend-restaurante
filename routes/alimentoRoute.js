const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getAlimentos,
  getAlimentoById,
  createAlimento,
  updateAlimento,
  deleteAlimento,
} = require("../controllers/alimentoController");

const { verificarToken, verificarRolAdmin } = require("../middlewares/authMiddleware");

// Middleware de validación
const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// 🧾 Obtener todos los alimentos (público o autenticado)
router.get("/", getAlimentos);

// 🔍 Obtener alimento por ID
router.get("/:id", getAlimentoById);

// ➕ Crear nuevo alimento (solo usuarios autenticados)
router.post(
  "/",
  verificarToken,
  [
    check("codigo", "El código es obligatorio").not().isEmpty(),
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "La categoría es obligatoria").not().isEmpty(),
    check("proveedor", "El proveedor es obligatorio").not().isEmpty(),
    check("unidadMedida", "La unidad de medida es obligatoria").isIn([
      "gramos",
      "litros",
      "mililitros",
      "unidades",
    ]),
    check("estado", "El estado debe ser Activo o Inactivo").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  createAlimento
);

// 🔄 Actualizar alimento (solo autenticado)
router.put(
  "/:id",
  verificarToken,
  [
    check("codigo", "El código es obligatorio").not().isEmpty(),
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "La categoría es obligatoria").not().isEmpty(),
    check("proveedor", "El proveedor es obligatorio").not().isEmpty(),
    check("unidadMedida", "La unidad de medida es obligatoria").isIn([
      "gramos",
      "litros",
      "mililitros",
      "unidades",
    ]),
    check("estado", "El estado debe ser Activo o Inactivo").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  updateAlimento
);

// ❌ Eliminar alimento (solo admin)
router.delete("/:id", verificarToken, verificarRolAdmin, deleteAlimento);

module.exports = router;
