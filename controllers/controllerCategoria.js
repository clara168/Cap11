const db = require('../config/db_sequelize');

module.exports = {
    async getCreate(req, res) {
        res.render('categoria/categoriaCreate');
    },

    async postCreate(req, res) {
        try {
            await db.Categoria.create(req.body);
            res.redirect('/categoria/list');
        } catch (error) {
            console.log(error);
            res.redirect('/home');
        }
    },

    async getList(req, res) {
        try {
            const categorias = await db.Categoria.findAll();
            res.render('categoria/categoriaList', { categorias: categorias.map(c => c.toJSON()) });
        } catch (error) {
            console.log(error);
        }
    },

    async getUpdate(req, res) {
        try {
            const categoria = await db.Categoria.findByPk(req.params.id);
            res.render('categoria/categoriaUpdate', { categoria: categoria.toJSON() });
        } catch (error) {
            console.log(error);
        }
    },

    async postUpdate(req, res) {
        try {
            await db.Categoria.update(req.body, { where: { id: req.body.id } });
            res.redirect('/categoria/list');
        } catch (error) {
            console.log(error);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Categoria.destroy({ where: { id: req.params.id } });
            res.redirect('/categoria/list');
        } catch (error) {
            console.log(error);
        }
    }
};
