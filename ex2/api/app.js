const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const livrosRoutes = require('./routes/livros');

const app = express();
const PORT = 19020;

mongoose.connect('mongodb://mongodb_ex2:27017/listaLeituras')
    .then(() => console.log('Ligado ao MongoDB Leituras!'))
    .catch(err => console.error('Erro:', err));

app.use(cors());
app.use(express.json());

app.use('/api/livros', livrosRoutes);

app.listen(PORT, () => {
    console.log(`API a correr na porta ${PORT}`);
});