const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        const usuarios = await db.Usuario.findAll();
        const espacos = await db.Espaco.findAll();
        res.render('reserva/reservaCreate', {
            usuarios: usuarios.map(u => u.toJSON()),
            espacos: espacos.map(e => e.toJSON())
        });
    },
    async postCreate(req, res) {
        db.Reserva.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },
    async getList(req, res) {
        
        db.Reserva.findAll({ include: [db.Usuario, db.Espaco] }).then(reservas => {
            res.render('reserva/reservaList', { 
                reservas: reservas.map(r => r.toJSON()) 
            });
        }).catch((err) => {
            console.log(err);
        });
    },
}