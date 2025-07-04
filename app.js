const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const middlewares = require('./middlewares/middlewares');
const routes = require('./routers/route');
const apiRoutes = require('./routers/apiRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig');

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

// --- Configuração dos Middlewares Essenciais ---

// 1. Configura o Handlebars como view engine
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 2. Middlewares para parsear o corpo das requisições 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 3. Middlewares de cookie e sessão
app.use(cookieParser());
app.use(session({
    secret: 'seu-texto-super-secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } 
}));

app.use(middlewares.logRegister);
app.use(middlewares.sessionControl);


// --- Configuração das Rotas ---

// Rotas da aplicação web (HTML)
app.use(routes);

// Rotas da API (com prefixo /api)
app.use('/api', apiRoutes);

// Rota da documentação da API (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.listen(8081, function() {
    console.log("Servidor rodando em http://localhost:8081");
    console.log("Documentação da API disponível em http://localhost:8081/api-docs");
});
