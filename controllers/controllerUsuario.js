const db = require('../config/db_sequelize');

module.exports = {
    
    async getLogin(req, res) {
        if (req.session.usuario) {
            res.redirect('/home');
        } else {
            res.render('usuario/login', { layout: 'noMenu.handlebars' });
        }
    },

    async postLogin(req, res) {
        const { email, senha_hash } = req.body;
        db.Usuario.findOne({ where: { email: email, senha_hash: senha_hash } })
        .then(usuario => {
            if (usuario) {
                req.session.usuario = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                };
                res.redirect('/home');
            } else {
                res.redirect('/');
            }
        }).catch(err => {
            console.log(err);
            res.redirect('/');
        });
    },

    async getLogout(req, res) {
        req.session.destroy(err => {
            if (err) return console.log(err);
            res.redirect('/');
        });
    },

    
    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        db.Usuario.create(req.body).then(() => {
            res.redirect('/home');
        }).catch((err) => {
            console.log(err);
        });
    },

    async getList(req, res) {
        db.Usuario.findAll().then(usuarios => {
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    },

    async getUpdate(req, res) {
        await db.Usuario.findByPk(req.params.id).then(
            usuario => res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues })
        ).catch(function (err) {
            console.log(err);
        });
    },

    async postUpdate(req, res) {
        await db.Usuario.update(req.body, { where: { id: req.body.id } }).then(() =>
            res.redirect('/usuarioList') 
        ).catch(function (err) {
            console.log(err);
        });
    },

    async getDelete(req, res) {
        await db.Usuario.destroy({ where: { id: req.params.id } }).then(() =>
            res.redirect('/usuarioList') 
        ).catch(err => {
            console.log(err);
        });
    }
}