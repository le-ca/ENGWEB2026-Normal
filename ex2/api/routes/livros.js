const express = require('express');
const router = express.Router();
const Livro = require('../models/livro');

// GET /api/livros ou GET /api/livros?search=X
router.get('/', async (req, res) => {
    try {
        let query = {};
        if (req.query.search) {
            query = {
                $or: [
                    { titulo: new RegExp(req.query.search, 'i') },
                    { autor: new RegExp(req.query.search, 'i') }
                ]
            };
        }
        const livros = await Livro.find(query);
        res.json(livros);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/livros
router.post('/', async (req, res) => {
    try {
        const novoLivro = await Livro.create(req.body);
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/livros/:id
router.put('/:id', async (req, res) => {
    try {
        const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(livro);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/livros/:id
router.delete('/:id', async (req, res) => {
    try {
        await Livro.findByIdAndDelete(req.params.id);
        res.json({ message: "Eliminado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;