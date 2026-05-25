const express = require('express');
const router = express.Router();
const Jogo = require('../models/jogo');

// GET /jogos e GET /jogos?editora=EEEE
router.get('/jogos', async (req, res) => {
    try {
        if (req.query.editora) {
            const jogos = await Jogo.find({ "editoras.name": req.query.editora }, { id: 1, name: 1, year: 1, _id: 1 });
            res.json(jogos);
        } else {
            const jogos = await Jogo.find({}, { id: 1, name: 1, year: 1, category: 1, minPlayers: 1, _id: 1 });
            res.json(jogos);
        }
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /autores
router.get('/autores', async (req, res) => {
    try {
        const autores = await Jogo.aggregate([
            { $unwind: "$autores" },
            { $group: { _id: "$autores.name", jogos: { $push: { id: "$id", nome: "$name" } } } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, autor: "$_id", jogos: 1 } }
        ]);
        res.json(autores);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /categorias
router.get('/categorias', async (req, res) => {
    try {
        const categorias = await Jogo.aggregate([
            { $group: { _id: "$category", jogos: { $push: { id: "$id", nome: "$name" } } } },
            { $sort: { _id: 1 } },
            { $project: { _id: 0, categoria: "$_id", jogos: 1 } }
        ]);
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// GET /jogos/:id
router.get('/jogos/:id', async (req, res) => {
    try {
        const jogo = await Jogo.findOne({ id: req.params.id });
        if (!jogo) return res.status(404).json({ erro: "Jogo não encontrado" });
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// POST /jogos
router.post('/jogos', async (req, res) => {
    try {
        const novoJogo = await Jogo.create(req.body);
        res.status(201).json(novoJogo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// PUT /jogos/:id
router.put('/jogos/:id', async (req, res) => {
    try {
        const jogo = await Jogo.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
        res.json(jogo);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// DELETE /jogos/:id
router.delete('/jogos/:id', async (req, res) => {
    try {
        await Jogo.findOneAndDelete({ id: req.params.id });
        res.json({ mensagem: "Jogo eliminado com sucesso" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;