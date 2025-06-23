module.exports = (sequelize, Sequelize) => {
    const Reserva = sequelize.define('reserva', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        data_reserva: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        hora_inicio: {
            type: Sequelize.TIME,
            allowNull: false
        },
        hora_fim: {
            type: Sequelize.TIME,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING, 
            allowNull: false,
            defaultValue: 'pendente'
        }
    });
    return Reserva;
}