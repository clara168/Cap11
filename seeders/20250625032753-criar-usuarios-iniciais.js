'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Administrador',
        email: 'admin@sistema.com',
        senha_hash: 'admin123', 
        tipo_usuario: 'admin',
        criado_em: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Usuario Comum',
        email: 'usuario@sistema.com',
        senha_hash: 'usuario123', 
        tipo_usuario: 'comum',
        criado_em: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};