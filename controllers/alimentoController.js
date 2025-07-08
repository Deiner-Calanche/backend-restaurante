const Alimento = require("../models/Alimento");

// Obtener todos los alimentos
const getAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.find()
      .populate("categoria", "nombres")
      .populate("proveedor", "nombres tipo");
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los alimentos", error });
  }
};

// Obtener alimento por ID
const getAlimentoById = async (req, res) => {
  try {
    const alimento = await Alimento.findById(req.params.id)
      .populate("categoria", "nombres")
      .populate("proveedor", "nombres tipo");
    if (!alimento) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json(alimento);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el alimento", error });
  }
};

// Crear nuevo alimento
const createAlimento = async (req, res) => {
  try {
    const alimento = new Alimento(req.body);
    await alimento.save();
    res.status(201).json(alimento);
  } catch (error) {
    res.status(400).json({ message: "Error al crear el alimento", error });
  }
};

// Actualizar alimento por ID
const updateAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!alimento) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json(alimento);
  } catch (error) {
    res.status(400).json({ message: "Error al actualizar el alimento", error });
  }
};

// Eliminar alimento por ID
const deleteAlimento = async (req, res) => {
  try {
    const alimento = await Alimento.findByIdAndDelete(req.params.id);
    if (!alimento) return res.status(404).json({ message: "Alimento no encontrado" });
    res.json({ message: "Alimento eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el alimento", error });
  }
};

module.exports = {
  getAlimentos,
  getAlimentoById,
  createAlimento,
  updateAlimento,
  deleteAlimento,
};
