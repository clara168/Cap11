const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('espaco/espacoCreate');
    },
    async postCreate(req, res) {
        db.Espaco.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },
    async getList(req, res) {
        db.Espaco.findAll().then(espacos => {
            res.render('espaco/espacoList', { espacos: espacos.map(e => e.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },
    async getUpdate(req, res) {
        await db.Espaco.findByPk(req.params.id).then(
            espaco => res.render('espaco/espacoUpdate', { espaco: espaco.dataValues })
        ).catch(function (err) {
            console.log(err);
        });
    },
    async postUpdate(req, res) {
        await db.Espaco.update(req.body, { where: { id: req.body.id } }).then(() =>
            res.redirect('/espaco/list')
        ).catch(function (err) {
            console.log(err);
        });
    },
    async getDelete(req, res) {
        await db.Espaco.destroy({ where: { id: req.params.id } }).then(() =>
            res.redirect('/espaco/list')
        ).catch(err => {
            console.log(err);
        });
    }
}