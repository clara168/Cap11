const db = require('../../config/db_sequelize');
const bcrypt = require('bcryptjs');
const jwt =require('jsonwebtoken');

// É muito importante que este segredo seja o mesmo usado no seu middleware
const segredo = 'seu-segredo-super-secreto-para-jwt'; 

module.exports = {
    async login(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios' });
        }

        try {
            // Encontra o usuário pelo email
            const usuario = await db.Usuario.findOne({ where: { email: email } });
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Compara a senha enviada com o hash salvo no banco
            const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha inválida' });
            }

            // Se a senha for válida, gera o token JWT
            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo_usuario },
                segredo,
                { expiresIn: '1h' } // Token expira em 1 hora
            );

            // Retorna o token
            res.json({
                message: 'Login bem-sucedido!',
                token: token
            });

        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    }
};
