const express = require('express');
const apiAuthController = require('../controllers/api/apiAuthController');
const apiEspacoController = require('../controllers/api/apiEspacoController');
const { verifyToken, isAdmin } = require('../middlewares/middlewares');
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
 *         description: Lista de espaços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Espaco'
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
 *         description: Dados do espaço
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Espaco'
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
 *         description: Espaço criado com sucesso
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
 *         description: Espaço atualizado com sucesso
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

module.exports = route;
