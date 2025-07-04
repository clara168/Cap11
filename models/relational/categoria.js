module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categoria', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        descricao: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false 
    });
    return Categoria;
};
