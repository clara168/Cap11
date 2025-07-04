const db = require('../../config/db_sequelize');

module.exports = {
    // GET /api/espacos - Listar todos os espaços
    async getAll(req, res) {
        try {
            const espacos = await db.Espaco.findAll();
            res.json(espacos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // GET /api/espacos/:id - Obter um espaço por ID
    async getById(req, res) {
        try {
            const espaco = await db.Espaco.findByPk(req.params.id);
            if (espaco) {
                res.json(espaco);
            } else {
                res.status(404).json({ error: 'Espaço não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // POST /api/espacos - Criar um novo espaço
    async create(req, res) {
        try {
            const novoEspaco = await db.Espaco.create(req.body);
            res.status(201).json(novoEspaco);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // PUT /api/espacos/:id - Atualizar um espaço
    async update(req, res) {
        try {
            const espaco = await db.Espaco.findByPk(req.params.id);
            if (espaco) {
                await espaco.update(req.body);
                res.json(espaco);
            } else {
                res.status(404).json({ error: 'Espaço não encontrado' });
            }
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // DELETE /api/espacos/:id - Deletar um espaço
    async delete(req, res) {
        try {
            const espaco = await db.Espaco.findByPk(req.params.id);
            if (espaco) {
                await espaco.destroy();
                res.status(204).send(); // Sem conteúdo
            } else {
                res.status(404).json({ error: 'Espaço não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
