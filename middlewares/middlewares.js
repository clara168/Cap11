const jwt = require('jsonwebtoken');
// Garanta que este segredo seja o mesmo em todos os arquivos que o usam
const segredo = 'seu-segredo-super-secreto-para-jwt'; 

module.exports = {
    
    // --- MIDDLEWARES PARA A APLICAÇÃO WEB (SESSÃO) ---

    logRegister: function(req, res, next) {
        // Ignora o log para rotas de API para não poluir o console
        if (!req.path.startsWith('/api')) {
            console.log(`[${new Date().toLocaleString('pt-BR')}] Rota Web: ${req.url} | Método: ${req.method}`);
        }
        next();
    },

    sessionControl: function(req, res, next) {
        // Se a rota for da API, este middleware não se aplica, ele passa para o próximo
        if (req.path.startsWith('/api')) {
            return next();
        }

        // Se o usuário já está logado (tem sessão)
        if (req.session.usuario) {
            res.locals.usuario = req.session.usuario;
            if (req.session.usuario.tipo_usuario === 'admin') {
                res.locals.admin = true;
            }
            return next();
        }
        
        // Se não está logado, permite acesso apenas a rotas públicas da aplicação web
        if (req.path === '/' || req.path === '/login' || req.path === '/usuarioCreate') {
            return next();
        }
        
        // Bloqueia todo o resto e redireciona para o login
        return res.redirect('/');
    },

    // --- MIDDLEWARES PARA A API REST (TOKEN JWT) ---

    verifyToken: function(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
        }

        jwt.verify(token, segredo, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: 'Token inválido ou expirado.' });
            }
            req.usuarioId = decoded.id;
            req.usuarioTipo = decoded.tipo;
            next();
        });
    },

    isAdmin: function(req, res, next) {
        if (req.usuarioTipo === 'admin') {
            next();
        } else {
            res.status(403).json({ error: 'Acesso negado. Rota exclusiva para administradores.' });
        }
    }
};
