const db = require('../config/db_sequelize');

module.exports = {
    async getLogin(req, res) {
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },
    async postLogin(req, res) {
        const { email, senha_hash } = req.body;
        db.Usuario.findOne({ where: { email: email, senha_hash: senha_hash } })
        .then(usuario => {
            if (usuario) {
                res.redirect('/home');
            } else {
                res.redirect('/');
            }
        }).catch(err => {
            console.log(err);
            res.redirect('/');
        });
    },
    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },
}