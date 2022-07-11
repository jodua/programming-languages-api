const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'programming-languages-api',
        description: 'REST api for programming languages',
    }
};

const outputFile = './src/config/swagger.json';
const endpointsFiles = ['./src/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);