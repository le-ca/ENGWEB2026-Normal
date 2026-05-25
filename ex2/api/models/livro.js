const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
    titulo: String,
    autor: String,
    paginas: Number,
    genero: String,
    lido: { type: Boolean, default: false }
});

module.exports = mongoose.model('Livro', livroSchema);