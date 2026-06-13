import 'dotenv/config';
import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: 'minha API',
        description: 'Uma simples API para gerenciamento de usuários'
    },
    host: 'localhost:' + process.env.SERVER_PORT,
    scremes: ['http']

    
};

const outputFile = './swagger-output.json';
const routes = ['./src/server.js'];
swaggerAutogen()(outputFile, routes, doc);