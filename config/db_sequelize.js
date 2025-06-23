const Sequelize = require('sequelize');
const sequelize = new Sequelize('web2_db', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuario = require('../models/relational/usuario.js')(sequelize, Sequelize);
db.Espaco = require('../models/relational/espaco.js')(sequelize, Sequelize);
db.Reserva = require('../models/relational/reserva.js')(sequelize, Sequelize);

db.Usuario.hasMany(db.Reserva, { foreignKey: 'usuario_id' });
db.Reserva.belongsTo(db.Usuario, { foreignKey: 'usuario_id' });

db.Espaco.hasMany(db.Reserva, { foreignKey: 'espaco_id' });
db.Reserva.belongsTo(db.Espaco, { foreignKey: 'espaco_id' });

module.exports = db;