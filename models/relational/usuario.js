module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        senha_hash: {
            type: Sequelize.STRING, 
            allowNull: false
        },
        tipo_usuario: {
            type: Sequelize.STRING, 
            allowNull: false
        }
    }, {
        timestamps: true,
        createdAt: 'criado_em',
        updatedAt: false 
    });
    return Usuario;
}