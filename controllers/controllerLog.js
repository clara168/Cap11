const mongoose = require('mongoose');
const db_mongoose = require('../config/db_mongoose');
const Log = require('../models/noSql/log'); 

mongoose.connect(db_mongoose.connection).then(() => {
    console.log('Conectado com o BD NoSQL (MongoDB)');
}).catch((err) => {
    console.log('Erro na conexão com o BD NoSQL: ' + err);
});

module.exports = {
    async getList(req, res) {
        await Log.find({}).sort({criado_em: -1}).then(logs => { 
            res.render('log/logList', { logs: logs.map(log => log.toJSON()) });
        }).catch((err) => {
            console.log(err);
        });
    }
}