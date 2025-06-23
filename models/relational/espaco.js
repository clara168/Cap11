module.exports = (sequelize, Sequelize) => {
    const Espaco = sequelize.define('espaco', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        capacidade: {
            type: Sequelize.INTEGER
        },
        localizacao: {
            type: Sequelize.STRING
        },
        recursos: {
            type: Sequelize.TEXT 
        }
    });
    return Espaco;
}