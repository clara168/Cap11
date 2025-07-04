const db = require('../../config/db_sequelize');

module.exports = {
    
    async getAll(req, res) {
        try {
            const reservas = await db.Reserva.findAll({ 
                include: [
                    { model: db.Usuario, attributes: ['id', 'nome', 'email'] },
                    { model: db.Espaco }
                ] 
            });
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar reservas.' });
        }
    },

    async create(req, res) {
        try {
            req.body.usuario_id = req.usuarioId;
            const novaReserva = await db.Reserva.create(req.body);
            res.status(201).json(novaReserva);
        } catch (error) {
            res.status(400).json({ error: 'Dados inválidos para criar reserva.' });
        }
    }
    
};
