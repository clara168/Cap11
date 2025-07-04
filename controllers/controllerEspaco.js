const db = require('../config/db_sequelize');

module.exports = {

    async getCreate(req, res) {
        try {
            res.render('espaco/espacoCreate');
        } catch (err) {
            console.log(err);
        }
    },

    async postCreate(req, res) {
        try {
            await db.Espaco.create(req.body);
            res.redirect('/espaco/list');
        } catch (err) {
            console.log(err);
        }
    },

    async getList(req, res) {
        try {
            const espacos = await db.Espaco.findAll({ include: 'categorias' });
            res.render('espaco/espacoList', { espacos: espacos.map(e => e.toJSON()) });
        } catch (err) {
            console.log(err);
        }
    },

    async getDelete(req, res) {
        try {
            await db.Espaco.destroy({ where: { id: req.params.id } });
            res.redirect('/espaco/list');
        } catch (err) {
            console.log(err);
        }
    },

    async getUpdate(req, res) {
        try {
            const espaco = await db.Espaco.findByPk(req.params.id);
            const todasCategorias = await db.Categoria.findAll();
            const categoriasAssociadas = await espaco.getCategorias();
            const idsCategoriasAssociadas = categoriasAssociadas.map(cat => cat.id);

            const categoriasParaView = todasCategorias.map(categoria => {
                return {
                    id: categoria.id,
                    nome: categoria.nome,
                    isChecked: idsCategoriasAssociadas.includes(categoria.id)
                }
            });

            res.render('espaco/espacoUpdate', {
                espaco: espaco.toJSON(),
                categorias: categoriasParaView
            });
        } catch (error) {
            console.log(error);
        }
    },

    async postUpdate(req, res) {
        try {
            const espaco = await db.Espaco.findByPk(req.body.id);
            await espaco.update(req.body);
            const idsCategorias = req.body.categorias || [];
            await espaco.setCategorias(idsCategorias);
            res.redirect('/espaco/list');
        } catch (error) {
            console.log(error);
        }
    }
};
