// Importações de módulos
const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors'); // 1. Importa o pacote cors
const middlewares = require('./middlewares/middlewares');
const routes = require('./routers/route');
const apiRoutes = require('./routers/apiRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./config/swaggerConfig');

// --- Conexões com os Bancos de Dados ---
const db_sequelize = require('./config/db_sequelize');
const mongoose = require('mongoose');
const db_mongoose = require('./config/db_mongoose');

// Conexão com o PostgreSQL
db_sequelize.sequelize.authenticate()
    .then(() => console.log('Conectado com o BD Relacional (PostgreSQL)'))
    .catch(err => console.error('Erro na conexão com o BD Relacional:', err));

// Conexão com o MongoDB
mongoose.connect(db_mongoose.connection)
    .then(() => console.log('Conectado com o BD NoSQL (MongoDB)'))
    .catch(err => console.error('Erro na conexão com o BD NoSQL:', err));

const app = express();

// --- Configuração dos Middlewares Essenciais ---

app.use(cors()); // 2. Habilita o CORS para todas as requisições

// Configura o Handlebars
app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middlewares para parsear o corpo das requisições
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares de cookie e sessão
app.use(cookieParser());
app.use(session({
    secret: 'seu-texto-super-secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}));

// Middlewares customizados
app.use(middlewares.logRegister);
app.use(middlewares.sessionControl);

// --- Configuração das Rotas ---
app.use(routes);
app.use('/api', apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- Iniciar o Servidor ---
app.listen(8081, function() {
    console.log("Servidor rodando em http://localhost:8081");
    console.log("Documentação da API disponível em http://localhost:8081/api-docs");
});
