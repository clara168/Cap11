const db = require('../../config/db_sequelize');

module.exports = {
    
    async getAll(req, res) {
        try {
            const categorias = await db.Categoria.findAll();
            res.json(categorias);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar categorias.' });
        }
    },

    async create(req, res) {
        try {
            const novaCategoria = await db.Categoria.create(req.body);
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(400).json({ error: 'Dados inválidos para criar categoria.' });
        }
    }
};
