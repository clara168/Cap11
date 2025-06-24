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
                req.session.usuario = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                };
                console.log('Sessão criada para o usuário:', req.session.usuario);
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
            if (err) {
                return console.log(err);
            }
            console.log('Sessão destruída.');
            res.redirect('/'); 
        });
    },


}