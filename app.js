const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require('./middlewares/middlewares');

// --- Conexões com os Bancos de Dados ---
const db_sequelize = require('./config/db_sequelize'); 
const mongoose = require('mongoose'); 
const db_mongoose = require('./config/db_mongoose'); 

// 1. Conexão com o PostgreSQL (Sequelize)
db_sequelize.sequelize.authenticate()
    .then(() => console.log('Conectado com o BD Relacional (PostgreSQL)'))
    .catch(err => console.error('Erro na conexão com o BD Relacional:', err));

// 2. Conexão com o MongoDB (Mongoose)
mongoose.connect(db_mongoose.connection)
    .then(() => console.log('Conectado com o BD NoSQL (MongoDB)'))
    .catch(err => console.error('Erro na conexão com o BD NoSQL:', err));



const app = express();

app.use(cookieParser());
app.use(session({
    secret: 'textosecreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 60 * 1000 }
}));

app.use(middlewares.logRegister);
app.use(middlewares.sessionControl);

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(8081, function() {
    console.log("Servidor no http://localhost:8081")
});
