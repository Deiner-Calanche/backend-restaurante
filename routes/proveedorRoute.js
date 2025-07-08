const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
} = require("../controllers/proveedorController");

const { verificarToken, verificarRolAdmin } = require("../middlewares/authMiddleware");

// Middleware de validación local
const validar = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// 📄 Obtener todos los proveedores (público o autenticado)
router.get("/", getProveedores);

// 🔍 Obtener proveedor por ID (público o autenticado)
router.get("/:id", getProveedorById);

// ➕ Crear proveedor (requiere autenticación)
router.post(
  "/",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("tipo", "El tipo es obligatorio (Interno/Externo)").isIn(["Interno", "Externo"]),
    check("telefono", "El teléfono es obligatorio").not().isEmpty(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  createProveedor
);

// 🔄 Actualizar proveedor (requiere autenticación)
router.put(
  "/:id",
  verificarToken,
  [
    check("nombres", "El nombre es obligatorio").not().isEmpty(),
    check("tipo", "El tipo es obligatorio (Interno/Externo)").isIn(["Interno", "Externo"]),
    check("telefono", "El teléfono es obligatorio").not().isEmpty(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
    check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
    validar,
  ],
  updateProveedor
);

// ❌ Eliminar proveedor (solo administrador)
router.delete("/:id", verificarToken, verificarRolAdmin, deleteProveedor);

module.exports = router;
