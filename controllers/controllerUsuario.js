const db = require('../config/db_sequelize');
const bcrypt = require('bcryptjs');

module.exports = {
    
    // --- FUNÇÕES DE LOGIN E SESSÃO ---

    async getLogin(req, res) {
        if (req.session.usuario) {
            return res.redirect('/home');
        }
        res.render('usuario/login', { layout: 'noMenu.handlebars' });
    },

    async postLogin(req, res) {
        const { email, senha_hash } = req.body;

        try {
            const usuario = await db.Usuario.findOne({ where: { email: email } });

            if (!usuario) {
                console.log('Tentativa de login com email não cadastrado:', email);
                return res.redirect('/');
            }
            console.log(senha_hash, usuario.senha_hash)

            const senhaValida = await bcrypt.compare(senha_hash, usuario.senha_hash);

            if (senhaValida) {
                req.session.usuario = {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo_usuario: usuario.tipo_usuario 
                };
                console.log('Login bem-sucedido para:', usuario.email);
                return res.redirect('/home');
            } else {
                console.log('Tentativa de login com senha inválida para:', email);
                return res.redirect('/');
            }
        } catch (err) {
            console.log(err);
            return res.redirect('/');
        }
    },

    async getLogout(req, res) {
        req.session.destroy(err => {
            if (err) return console.log(err);
            res.redirect('/');
        });
    },

    // --- FUNÇÕES DE CRUD (CRIAR, LER, ATUALIZAR, DELETAR) ---

    async getCreate(req, res) {
        res.render('usuario/usuarioCreate');
    },

    async postCreate(req, res) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.senha_hash, salt);

            const novoUsuario = {
                nome: req.body.nome,
                email: req.body.email,
                senha_hash: hash, 
                tipo_usuario: req.body.tipo_usuario || 'comum' 
            };

            await db.Usuario.create(novoUsuario);
            
            res.redirect('/');

        } catch (err) {
            console.log(err);
        }
    },

    async getList(req, res) {
        try {
            const usuarios = await db.Usuario.findAll();
            res.render('usuario/usuarioList', { usuarios: usuarios.map(user => user.toJSON()) });
        } catch (err) {
            console.log(err);
        }
    },

    async getUpdate(req, res) {
        try {
            const usuario = await db.Usuario.findByPk(req.params.id);
            res.render('usuario/usuarioUpdate', { usuario: usuario.dataValues });
        } catch (err) {
            console.log(err);
        }
    },

    async postUpdate(req, res) {
        try {
            // Lógica para atualizar a senha se ela for fornecida
            if (req.body.senha_hash && req.body.senha_hash.trim() !== '') {
                const salt = await bcrypt.genSalt(10);
                req.body.senha_hash = await bcrypt.hash(req.body.senha_hash, salt);
            } else {
                delete req.body.senha_hash; // Remove o campo para não salvar uma senha vazia
            }
            
            await db.Usuario.update(req.body, { where: { id: req.body.id } });
            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Usuario.destroy({ where: { id: req.params.id } });
            res.redirect('/usuarioList');
        } catch (err) {
            console.log(err);
        }
    }
}
