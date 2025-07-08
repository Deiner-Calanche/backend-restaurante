const Tipo = require("../models/Tipo");

//Obtener los Tipos

const getTipos = async (req, res) => {
  try {
    const tipos = await Tipo.find();
    res.json(tipos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los tipos", error });
  }
};


// Obtener tipo por ID
const getTipoById = async (req, res) => {
  try {
    const tipo = await Tipo.findById(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json(tipo);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el tipo', error });
  }
};

// Crear tipo
const createTipo = async (req, res) => {
  try {
    const nuevoTipo = new Tipo(req.body);
    const tipoGuardado = await nuevoTipo.save();
    res.status(201).json({
      message: '✅ Tipo creado exitosamente',
      data: tipoGuardado
    });
  } catch (error) {
    res.status(400).json({ message: '❌ Error al crear el Tipo', error });
  }
};




// Actualizar tipo
const updateTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json({
      message: '✏️ Tipo actualizado correctamente',
      data: tipo
    });
  } catch (error) {
    res.status(400).json({ message: '❌ Error al actualizar el tipo', error });
  }
};

// Eliminar tipo
const deleteTipo = async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) return res.status(404).json({ message: 'Tipo no encontrado' });
    res.json({ message:'🗑️ Tipo eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error al eliminar el tipo', error });
  }
};

module.exports = {
  getTipos,
  getTipoById,
  createTipo,
  updateTipo,
  deleteTipo,
};