const Categoria = require("../models/Categoria");

// Obtener todas las categorías
const getCategoria = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};

// Obtener categoría por ID
const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error });
  }
};

// Crear categoría
const createCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json({
      message: '✅ Categoría creada exitosamente',
      data: categoriaGuardada
    });
  } catch (error) {
    res.status(400).json({ message: '❌ Error al crear la categoría', error });
  }
};

// Actualizar categoría
const updateCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({
      message: '✏️ Categoría actualizada correctamente',
      data: categoria
    });
  } catch (error) {
    res.status(400).json({ message: '❌ Error al actualizar la categoría', error });
  }
};

// Eliminar categoría
const deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: '🗑️ Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al eliminar la categoría', error });
  }
};

module.exports = {
  getCategoria,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
