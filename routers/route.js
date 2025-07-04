const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerEspaco = require('../controllers/controllerEspaco');
const controllerReserva = require('../controllers/controllerReserva');
const controllerLog = require('../controllers/controllerLog');
const route = express.Router();

// Não precisamos mais da função checkSession aqui,
// pois o middleware global em app.js já faz esse trabalho.

// Rota Home
route.get("/home", (req, res) => {
    res.render('home');
});

// --- Rotas de Usuário ---
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);
route.get("/usuarioCreate", controllerUsuario.getCreate);
route.post("/usuarioCreate", controllerUsuario.postCreate);
route.get("/usuarioList", controllerUsuario.getList);
route.get("/usuarioUpdate/:id", controllerUsuario.getUpdate);
route.post("/usuarioUpdate", controllerUsuario.postUpdate);
route.get("/usuarioDelete/:id", controllerUsuario.getDelete);

// --- Rotas de Espaço ---
route.get("/espaco/create", controllerEspaco.getCreate);
route.post("/espaco/create", controllerEspaco.postCreate);
route.get("/espaco/list", controllerEspaco.getList);
route.get("/espaco/update/:id", controllerEspaco.getUpdate);
route.post("/espaco/update", controllerEspaco.postUpdate);
route.get("/espaco/delete/:id", controllerEspaco.getDelete);

// --- Rotas de Reserva ---
route.get("/reserva/create", controllerReserva.getCreate);
route.post("/reserva/create", controllerReserva.postCreate);
route.get("/reserva/list", controllerReserva.getList);
route.get("/reserva/delete/:id", controllerReserva.getDelete);

// --- Rotas de Log ---
route.get("/log/list", controllerLog.getList);

module.exports = route;
