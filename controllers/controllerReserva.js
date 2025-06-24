const db = require('../config/db_sequelize');
const Log = require('../models/noSql/log');

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
        let reservaCriada;
        db.Reserva.create(req.body)
            .then((reserva) => {
                reservaCriada = reserva;
                return Log.create({
                    usuario_id: req.session.usuario.id, 
                    acao: 'reserva_criada',
                    detalhes: {
                        reserva_id: reserva.id,
                        espaco_id: reserva.espaco_id,
                        data: reserva.data_reserva
                    },
                    ip: req.ip
                });
            })
            .then(() => {
                console.log(`Log de auditoria salvo para a reserva ID: ${reservaCriada.id}`);
                res.redirect('/home');
            })
            .catch((err) => {
                console.log(err);
            });
    },
    async getList(req, res) {
        db.Reserva.findAll({ include: [{ model: db.Usuario }, { model: db.Espaco }] }).then(reservas => {
            res.render('reserva/reservaList', {
                reservas: reservas.map(r => r.toJSON())
            });
        }).catch((err) => {
            console.log(err);
        });
    },
    async getDelete(req, res) {
        await db.Reserva.destroy({ where: { id: req.params.id } }).then(() =>
            res.redirect('/reserva/list')
        ).catch(err => {
            console.log(err);
        });
    }
}