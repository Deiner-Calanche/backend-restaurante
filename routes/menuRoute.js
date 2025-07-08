const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();

const {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
} = require("../controllers/menuController");

const { verificarToken, verificarRolAdmin } = require("../middlewares/authMiddleware");

// Validación local
const validar = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    next();
};

// 📄 Obtener todos los Menús (público o autenticado)
router.get("/", getMenus);

// 🔎 Obtener un menú por ID
router.get("/:id", getMenuById);

// ➕ Crear nuevo Menú (solo usuarios autenticados)
router.post(
    "/",
    verificarToken,
    [
        check("codigo", "El código es obligatorio").not().isEmpty(),
        check("fecha", "La fecha es obligatoria").not().isEmpty(),
        check("tipo", "El tipo es obligatorio").not().isEmpty(),
        check("alimentos", "Debe proporcionar al menos un alimento").isArray({ min: 1 }),
        check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
        validar,
    ],
    createMenu
);

// 🔄 Actualizar Menú por ID (solo autenticado)
router.put(
    "/:id",
    verificarToken,
    [
        check("codigo", "El código es obligatorio").not().isEmpty(),
        check("fecha", "La fecha es obligatoria").not().isEmpty(),
        check("tipo", "El tipo es obligatorio").not().isEmpty(),
        check("alimentos", "Debe proporcionar al menos un alimento").isArray({ min: 1 }),
        check("estado", "El estado es obligatorio (Activo/Inactivo)").isIn(["Activo", "Inactivo"]),
        validar,
    ],
    updateMenu
);

// ❌ Eliminar Menú por ID (solo admin)
router.delete("/:id", verificarToken, verificarRolAdmin, deleteMenu);

module.exports = router;
