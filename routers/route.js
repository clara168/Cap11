const express = require('express');
const db = require('../config/db_sequelize');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerEspaco = require('../controllers/controllerEspaco');
const controllerReserva = require('../controllers/controllerReserva');
const route = express.Router();


module.exports = route;

route.get("/home", function (req, res) { res.render('home')});

route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);

route.get("/usuarioList", controllerUsuario.getList);


route.get("/espaco/create", controllerEspaco.getCreate);
route.post("/espaco/create", controllerEspaco.postCreate);
route.get("/espaco/list", controllerEspaco.getList);



route.get("/reserva/create", controllerReserva.getCreate);
route.post("/reserva/create", controllerReserva.postCreate);
route.get("/reserva/list", controllerReserva.getList);
