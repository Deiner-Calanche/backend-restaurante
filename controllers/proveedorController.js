const Proveedor = require("../models/Proveedor");

// Obtener todos los proveedores
const getProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedores", error });
  }
};

// Obtener proveedor por ID
const getProveedorById = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener proveedor", error });
  }
};

// Crear nuevo proveedor
const createProveedor = async (req, res) => {
  try {
    const proveedor = new Proveedor(req.body);
    await proveedor.save();
    res.status(201).json({
      message: "✅ Proveedor creado correctamente",
      proveedor,
    });
  } catch (error) {
    res.status(400).json({ message: "❌ Error al crear proveedor", error });
  }
};

// Actualizar proveedor
const updateProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.status(200).json({
      message: "✅ Proveedor actualizado correctamente",
      proveedor,
    });
  } catch (error) {
    res.status(400).json({ message: "❌ Error al actualizar proveedor", error });
  }
};

// Eliminar proveedor
const deleteProveedor = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.status(200).json({ message: "✅ Proveedor eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error al eliminar proveedor", error });
  }
};

module.exports = {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor,
};
