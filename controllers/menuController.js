const Menu = require("../models/Menu");

// Obtener todos los menús
const getMenus = async (req, res) => {
    try {
        const menus = await Menu.find()
            .populate("tipo", "nombres")
            .populate("alimentos", "nombres categoria proveedor unidadMedida");
        res.json(menus);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los menús", error });
    }
};

// Obtener menú por ID
const getMenuById = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id)
            .populate("tipo", "nombres")
            .populate("alimentos", "nombres categoria proveedor unidadMedida");
        if (!menu) {
            return res.status(404).json({ message: "Menú no encontrado" });
        }
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el menú", error });
    }
};

// Crear un nuevo menú
const createMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();
        const menuCompleto = await Menu.findById(menu._id)
            .populate("tipo", "nombres")
            .populate("alimentos", "nombres categoria proveedor unidadMedida");
        res.status(201).json(menuCompleto);
    } catch (error) {
        res.status(400).json({ message: "Error al crear el menú", error });
    }
};

// Actualizar un menú existente
const updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
            .populate("tipo", "nombres")
            .populate("alimentos", "nombres categoria proveedor unidadMedida");

        if (!menu) {
            return res.status(404).json({ message: "Menú no encontrado" });
        }

        res.json(menu);
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el menú", error });
    }
};

// Eliminar un menú
const deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndDelete(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: "Menú no encontrado" });
        }
        res.json({ message: "Menú eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el menú", error });
    }
};

module.exports = {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu,
};
