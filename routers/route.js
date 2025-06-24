const express = require('express');
const controllerUsuario = require('../controllers/controllerUsuario');
const controllerEspaco = require('../controllers/controllerEspaco');
const controllerReserva = require('../controllers/controllerReserva');
const controllerLog = require('../controllers/controllerLog');
const route = express.Router();

function checkSession(req, res, next) {
    if (req.session.usuario) {
        next(); 
    } else {
        res.redirect('/'); 
    }
}

// Rota Home (agora usando o middleware)
route.get("/home", checkSession, (req, res) => {
    res.render('home', { usuario: req.session.usuario });
});

// --- Controller Usuario ---
route.get("/", controllerUsuario.getLogin);
route.post("/login", controllerUsuario.postLogin);
route.get("/logout", controllerUsuario.getLogout);

// Rotas de CRUD de Usuário (protegidas pela sessão)
route.get("/usuarioCreate", checkSession, controllerUsuario.getCreate);
route.post("/usuarioCreate", checkSession, controllerUsuario.postCreate);
route.get("/usuarioList", checkSession, controllerUsuario.getList);
route.get("/usuarioUpdate/:id", checkSession, controllerUsuario.getUpdate);
route.post("/usuarioUpdate", checkSession, controllerUsuario.postUpdate);
route.get("/usuarioDelete/:id", checkSession, controllerUsuario.getDelete);

// --- Controller Espaco (protegidas pela sessão) ---
route.get("/espaco/create", checkSession, controllerEspaco.getCreate);
route.post("/espaco/create", checkSession, controllerEspaco.postCreate);
route.get("/espaco/list", checkSession, controllerEspaco.getList);
route.get("/espaco/update/:id", checkSession, controllerEspaco.getUpdate);
route.post("/espaco/update", checkSession, controllerEspaco.postUpdate);
route.get("/espaco/delete/:id", checkSession, controllerEspaco.getDelete);

// --- Controller Reserva (protegidas pela sessão) ---
route.get("/reserva/create", checkSession, controllerReserva.getCreate);
route.post("/reserva/create", checkSession, controllerReserva.postCreate);
route.get("/reserva/list", checkSession, controllerReserva.getList);
route.get("/reserva/delete/:id", checkSession, controllerReserva.getDelete);

// --- Controller Log (protegidas pela sessão) ---
route.get("/log/list", checkSession, controllerLog.getList);

module.exports = route;