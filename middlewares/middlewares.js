module.exports = {
    logRegister: function(req, res, next) {
        console.log(`[${new Date().toLocaleString('pt-BR')}] Rota: ${req.url} | Método: ${req.method}`);
        next();
    },

    sessionControl: function(req, res, next) {
        
        if (req.session.usuario) {
            
            res.locals.usuario = req.session.usuario;
            if (req.session.usuario.tipo_usuario === 'admin') {
                res.locals.admin = true;
            }
            return next(); 
        }
        
        if ( (req.path === '/' || req.path === '/login' || req.path === '/usuarioCreate') ) {
            return next(); 
        }
        
        return res.redirect('/');
    }
};
