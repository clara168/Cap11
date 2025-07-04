const db = require('../../config/db_sequelize');

module.exports = {
    
    async getAll(req, res) {
        try {
            const usuarios = await db.Usuario.findAll({
                
                attributes: { exclude: ['senha_hash'] }
            });
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuários.' });
        }
    },

    async getById(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id, {
                attributes: { exclude: ['senha_hash'] }
            });
            if (usuario) {
                res.json(usuario);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário.' });
        }
    }
};
