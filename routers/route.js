const express = require('express');
const db = require('../config/db_sequelize');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerEspaco = require('../controllers/controllerEspaco');
const controllerReserva = require('../controllers/controllerReserva');
const controllerLog = require('../controllers/controllerLog');
const route = express.Router();

module.exports = route;

// --- Rota Home Protegida ---
route.get("/home", function (req, res) {
    if (req.session.usuario) { 
        res.render('home', { usuario: req.session.usuario }); 
    } else {
        res.redirect('/'); 
    }
});

// --- Controller Usuario ---
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout); 
route.get("/usuarioList", controllerUsuario.getList);
