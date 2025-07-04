const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API de Reservas de Espaços Coletivos',
            version: '1.0.0',
            description: 'Documentação da API para gerenciar espaços e reservas.'
        },
        servers: [
            {
                url: 'http://localhost:8081',
                description: 'Servidor de Desenvolvimento'
            }
        ],
        tags: [
            { name: 'Autenticação', description: 'Login para obter token de acesso' },
            { name: 'Espaços', description: 'Operações para gerenciar espaços' },
            { name: 'Reservas', description: 'Operações para gerenciar reservas' },
            { name: 'Usuários', description: 'Operações para visualizar usuários' },
            { name: 'Categorias', description: 'Operações para gerenciar categorias' }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                Espaco: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        nome: { type: 'string' },
                        tipo: { type: 'string' },
                        capacidade: { type: 'integer' },
                        localizacao: { type: 'string' },
                        recursos: { type: 'string' }
                    }
                },
                Reserva: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        espaco_id: { type: 'integer' },
                        data_reserva: { type: 'string', format: 'date' },
                        hora_inicio: { type: 'string', example: '14:00:00' },
                        hora_fim: { type: 'string', example: '15:00:00' },
                        status: { type: 'string', example: 'Confirmada' }
                    }
                },
                Usuario: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        nome: { type: 'string' },
                        email: { type: 'string', format: 'email' },
                        tipo_usuario: { type: 'string' }
                    }
                },
                Categoria: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer', readOnly: true },
                        nome: { type: 'string' },
                        descricao: { type: 'string' }
                    }
                }
            }
        }
    },
    apis: ['./routers/apiRoute.js']
};

module.exports = swaggerJsDoc(swaggerOptions);
