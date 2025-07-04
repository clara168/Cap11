'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('usuario123', 10);

    await queryInterface.bulkInsert('usuarios', [
      {
        nome: 'Administrador',
        email: 'admin@sistema.com',
        senha_hash: adminPassword, 
        tipo_usuario: 'admin',
        criado_em: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Usuario Comum',
        email: 'usuario@sistema.com',
        senha_hash: userPassword, 
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
