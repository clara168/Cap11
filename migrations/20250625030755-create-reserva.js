'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reservas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
        allowNull: false
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // Nome da tabela referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      espaco_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'espacos', // Nome da tabela referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reservas');
  }
};
