const { Schema, model } = require('mongoose');

const Tipochema = Schema({
    nombres: { type: String, required: true,unique: true },
    estado: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = model('Tipo', Tipochema);
