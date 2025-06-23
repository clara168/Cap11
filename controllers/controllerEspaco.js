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
}