const express = require('express');
const { verifyToken, isAdmin } = require('../middlewares/middlewares');

const apiAuthController = require('../controllers/api/apiAuthController');
const apiEspacoController = require('../controllers/api/apiEspacoController');
const apiUsuarioController = require('../controllers/api/apiUsuarioController');
const apiReservaController = require('../controllers/api/apiReservaController');
const apiCategoriaController = require('../controllers/api/apiCategoriaController');

const route = express.Router();

/**
 * @swagger
 * /api/login:
 *   post:
 *     tags: [Autenticação]
 *     summary: Autentica um usuário e retorna um token JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@sistema.com"
 *               senha:
 *                 type: string
 *                 example: "admin123"
 *     responses:
 *       '200':
 *         description: Login bem-sucedido
 */
route.post('/login', apiAuthController.login);

/**
 * @swagger
 * /api/espacos:
 *   get:
 *     tags: [Espaços]
 *     summary: Lista todos os espaços
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */
route.get('/espacos', verifyToken, apiEspacoController.getAll);

/**
 * @swagger
 * /api/espacos/{id}:
 *   get:
 *     tags: [Espaços]
 *     summary: Busca um espaço por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Sucesso
 */
route.get('/espacos/:id', verifyToken, apiEspacoController.getById);

/**
 * @swagger
 * /api/espacos:
 *   post:
 *     tags: [Espaços]
 *     summary: Cria um novo espaço (Apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Espaco'
 *     responses:
 *       '201':
 *         description: Criado com sucesso
 */
route.post('/espacos', verifyToken, isAdmin, apiEspacoController.create);

/**
 * @swagger
 * /api/espacos/{id}:
 *   put:
 *     tags: [Espaços]
 *     summary: Atualiza um espaço (Apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Espaco'
 *     responses:
 *       '200':
 *         description: Atualizado com sucesso
 */
route.put('/espacos/:id', verifyToken, isAdmin, apiEspacoController.update);

/**
 * @swagger
 * /api/espacos/{id}:
 *   delete:
 *     tags: [Espaços]
 *     summary: Deleta um espaço (Apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Deletado com sucesso
 */
route.delete('/espacos/:id', verifyToken, isAdmin, apiEspacoController.delete);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     tags: [Reservas]
 *     summary: Lista todas as reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */
route.get('/reservas', verifyToken, apiReservaController.getAll);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     tags: [Reservas]
 *     summary: Cria uma nova reserva para o usuário autenticado
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reserva'
 *     responses:
 *       '201':
 *         description: Reserva criada com sucesso
 */
route.post('/reservas', verifyToken, apiReservaController.create);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: [Usuários]
 *     summary: Lista todos os usuários (Apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */
route.get('/usuarios', verifyToken, isAdmin, apiUsuarioController.getAll);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     tags: [Categorias]
 *     summary: Lista todas as categorias
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Sucesso
 */
route.get('/categorias', verifyToken, apiCategoriaController.getAll);

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     tags: [Categorias]
 *     summary: Cria uma nova categoria (Apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       '201':
 *         description: Categoria criada com sucesso
 */
route.post('/categorias', verifyToken, isAdmin, apiCategoriaController.create);

module.exports = route;
