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
            {
                name: 'Autenticação',
                description: 'Login para obter token de acesso'
            },
            {
                name: 'Espaços',
                description: 'Operações para gerenciar espaços'
            }
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
                    },
                    required: ['nome', 'tipo']
                }
            }
        }
    },
    apis: ['./routers/apiRoute.js']
};

module.exports = swaggerJsDoc(swaggerOptions);
