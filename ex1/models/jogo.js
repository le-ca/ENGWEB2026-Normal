const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
    _id: String,
    name: String,
    year: Number,
    category: String,
    minPlayers: Number,
    maxPlayers: Number,
    playingTimeMinutes: Number,
    descriptionEN: String,
    autores: Array,
    editoras: Array,
    mecanicas: Array,
    premios: Array
}, { strict: false });

module.exports = mongoose.model('Jogo', jogoSchema, 'jogos');